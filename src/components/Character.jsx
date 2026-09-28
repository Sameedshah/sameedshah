import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MODEL = '/models/character.glb';

/** Every GLB is authored at a different scale, so we normalise to this height
 *  in world units and let the camera framing stay fixed. */
const MODEL_HEIGHT = 3.2;

/** Used if the measurement below comes back implausible. Measured offline for
 *  the shipped model: 4.79 units tall → 3.2 / 4.79. */
const FALLBACK_SCALE = 0.668;

/* Camera framing. fov is vertical, so the visible height at the model's depth
   is 2 * tan(fov/2) * z — here about 6.4 units for a 3.2-unit model, which
   leaves head- and foot-room instead of cropping to a bust. The reference site
   frames a human bust; this model is full-body and needs the wider shot. */
const CAMERA = { position: [0, 0.55, 9.3], fov: 38 };

/* ---------------------------------------------------------------------------
 * SCROLL CHOREOGRAPHY
 *
 * The model is pinned (position: fixed) across the first three sections and
 * scrubbed through these keyframes. `at` is scroll progress 0 → 1 across the
 * hero + about + what-I-do range.
 *
 * `clip` must match an animation name inside the GLB. This model ships with:
 *   Dance, Death, Idle, Jump, No, Punch, Running, Sitting,
 *   Standing, ThumbsUp, Walking, WalkJump, Wave, Yes
 *
 * Swapping in your own GLB = change MODEL above and the clip names here.
 * ------------------------------------------------------------------------- */
const KEYFRAMES = [
  // hero — centred, facing the viewer
  { at: 0.00, x:  0.00, y: -1.75, z: 0, rotY:  0.00, scale: 1.00, clip: 'Idle' },
  // waves hello, standing still: this pair holds x at 0 so the gesture reads
  // as a greeting rather than something done while walking away
  { at: 0.14, x:  0.00, y: -1.75, z: 0, rotY:  0.00, scale: 1.00, clip: 'Wave' },
  { at: 0.30, x:  0.00, y: -1.75, z: 0, rotY:  0.00, scale: 1.00, clip: 'Walking' },
  // walks out of the headline's way, over to the left
  { at: 0.50, x: -2.45, y: -1.72, z: 0, rotY: -0.30, scale: 0.89, clip: 'Idle' },
  // about — parked left, copy takes the right half
  { at: 0.64, x: -2.55, y: -1.72, z: 0, rotY:  0.24, scale: 0.88, clip: 'Sitting' },
  // what-I-do — sits down to work while the panels are read
  { at: 0.90, x: -2.55, y: -1.72, z: 0, rotY:  0.22, scale: 0.88, clip: 'Sitting' },
  // drops out of frame before the career section
  { at: 1.00, x: -2.55, y: -4.60, z: 0, rotY:  0.22, scale: 0.88, clip: 'Sitting' },
];

const CROSSFADE = 0.35; // seconds

/**
 * World-space bounds of a loaded model.
 *
 * Deliberately geometry-based: geometry.boundingBox transformed by matrixWorld.
 * The GLB's raw vertex data is tiny (~0.07 units) because it is authored in
 * bind space, but the node transforms scale it back up, so this reports the
 * true 4.79-unit height.
 *
 * SkinnedMesh.computeBoundingBox() looks like the more correct tool and is a
 * trap here: it reads skeleton.boneMatrices, which have not been initialised at
 * the point this runs, and reports 310 x 149 x 182 for the same model — a
 * scale of 0.021 that renders the character as an invisible speck. Do not
 * "fix" this by switching to it.
 */
function measureBounds(root) {
  root.updateWorldMatrix(true, true);

  const box = new THREE.Box3();
  const part = new THREE.Box3();

  root.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    if (!o.geometry.boundingBox) return;

    box.union(part.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld));
  });

  return box;
}

function Model({ progress }) {
  const group = useRef();
  const { scene, animations } = useGLTF(MODEL);
  const { actions } = useAnimations(animations, group);
  const current = useRef(null);
  const clipName = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  /* SkeletonUtils.clone, not scene.clone: a plain clone copies the SkinnedMesh
     but leaves it pointing at the original skeleton, so the copy's bone
     matrices are never driven and it measures (and renders) wrong. */
  const model = useMemo(() => cloneSkinned(scene), [scene]);

  /* Auto-fit: normalise whatever GLB is loaded to a known height and stand it
     on y=0, so the keyframes above stay valid when you swap in your own model.
     Without this every new file needs the whole table re-tuned by hand. */
  const fit = useMemo(() => {
    const box = measureBounds(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    /* Clamp hard. A mis-measured skeleton yields a near-zero height, and
       MODEL_HEIGHT / 0.02 puts a robot the size of a building in the hero.
       Anything outside a plausible range falls back to the known-good scale
       for the shipped model. */
    const plausible = Number.isFinite(size.y) && size.y > 0.25 && size.y < 1000;
    const s = plausible ? MODEL_HEIGHT / size.y : FALLBACK_SCALE;

    if (import.meta.env.DEV) {
      const msg =
        `[character] measured ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}` +
        ` -> scale ${s.toFixed(3)} (${plausible ? 'measured' : 'FALLBACK'})`;
      console.log(msg);
      window.__characterFit = { size: size.toArray(), scale: s, minY: box.min.y, msg };
    }

    return {
      scale: s,
      // centre on X/Z, and drop the lowest vertex onto the group's origin
      position: [-center.x * s, -box.min.y * s, -center.z * s],
    };
  }, [model]);

  // Repaint the robot into the site's palette — the stock model is orange.
  useEffect(() => {
    model.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      o.material = o.material.clone();

      if (o.material.name === 'Main') {
        o.material.color = new THREE.Color('#7fb2ff');
        o.material.emissive = new THREE.Color('#1f356b');
        o.material.emissiveIntensity = 0.45;
        o.material.roughness = 0.35;
        o.material.metalness = 0.25;
      } else if (o.material.name === 'Grey') {
        o.material.color = new THREE.Color('#e1e6ec');
        o.material.roughness = 0.5;
      } else {
        o.material.color = new THREE.Color('#0f1218');
        o.material.roughness = 0.6;
      }
    });
  }, [model]);

  // Head tracks the cursor a little — the small thing that makes it feel alive
  // rather than like a looping GIF.
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /** Imperative clip crossfade — called from useFrame, never from render. */
  const playClip = (name) => {
    const next = actions?.[name];
    if (!next || next === current.current) return;

    next.reset().setEffectiveWeight(1).fadeIn(CROSSFADE).play();
    // one-shots read as gestures; loops read as states
    next.setLoop(THREE.LoopRepeat, name === 'Wave' || name === 'ThumbsUp' ? 2 : Infinity);

    current.current?.fadeOut(CROSSFADE);
    current.current = next;
    clipName.current = name;
  };

  /* Everything scroll-driven happens here, reading a ref.
     This used to be React state written from ScrollTrigger's onUpdate, which
     re-rendered the whole subtree on every scroll frame and made the model
     visibly stutter — most obviously through the what-I-do section, where the
     sit-down transition happens. The scene now never re-renders from scroll. */
  useFrame((_, delta) => {
    if (!group.current) return;
    const g = group.current;
    const state = sample(progress.current);

    if (state.clip !== clipName.current) playClip(state.clip);

    // scroll-driven placement
    g.position.x = THREE.MathUtils.damp(g.position.x, state.x, 8, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, state.y, 8, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, state.scale, 8, delta));

    // scroll rotation + a small cursor lean on top of it
    const targetRot = state.rotY + pointer.current.x * 0.22;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRot, 6, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.05, 6, delta);
  });

  return (
    <group ref={group} position={[0, -1.75, 0]} dispose={null}>
      <group scale={fit.scale} position={fit.position}>
        <primitive object={model} />
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#a6b9d6" />
      {/* key — warm white, front-left */}
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#f4f8ff" castShadow />
      {/* rim — the magenta edge that separates the model from the near-black bg */}
      <directionalLight position={[-4, 2, -3]} intensity={2.6} color="#8dd4ff" />
      {/* fill — indigo bounce from below */}
      <pointLight position={[0, -2, 3]} intensity={12} distance={12} color="#0040ff" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={1} intensity={18} color="#7fb2ff" />
    </>
  );
}

/**
 * Interpolates the keyframe table at an arbitrary scroll progress.
 * Numeric fields lerp; `clip` snaps to whichever keyframe we've passed.
 */
function sample(p) {
  const k = KEYFRAMES;
  if (p <= k[0].at) return { ...k[0] };
  if (p >= k[k.length - 1].at) return { ...k[k.length - 1] };

  let i = 0;
  while (i < k.length - 1 && p > k[i + 1].at) i++;

  const a = k[i];
  const b = k[i + 1];
  const t = (p - a.at) / (b.at - a.at || 1);
  const mix = (n, m) => n + (m - n) * t;

  return {
    x: mix(a.x, b.x),
    y: mix(a.y, b.y),
    z: mix(a.z, b.z),
    rotY: mix(a.rotY, b.rotY),
    scale: mix(a.scale, b.scale),
    clip: a.clip, // hold the current clip until the next keyframe is reached
  };
}

export default function Character() {
  const wrapRef = useRef(null);
  const progress = useRef(0);
  const pastRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [past, setPast] = useState(false);

  // Mobile gets the CSS portrait fallback instead — a pinned WebGL canvas on a
  // phone costs battery and fights the native scroll.
  const enabled = typeof window !== 'undefined' && window.innerWidth > 768;

  useLayoutEffect(() => {
    if (!enabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.landing-section',
        start: 'top top',
        // hero + about + what-I-do
        endTrigger: '.whatIDO',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          // Ref, not state: this fires on every scroll frame.
          progress.current = self.progress;

          /* The canvas is position:fixed, so without this it hangs over every
             section below. Only commit to React when the flag actually flips,
             so scrolling doesn't re-render on each frame. */
          const gone = self.progress > 0.97;
          if (gone !== pastRef.current) {
            pastRef.current = gone;
            setPast(gone);
          }
        },
      });
    });

    return () => ctx.revert();
  }, [enabled]);

  useEffect(() => {
    if (ready) wrapRef.current?.classList.add('character-loaded');
  }, [ready]);

  if (!enabled) return null;

  return (
    <div className={`character-model${past ? ' character-gone' : ''}`} ref={wrapRef}>
      <div className="character-rim" />
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
        onCreated={() => setReady(true)}
      >
        <PerspectiveCamera makeDefault position={CAMERA.position} fov={CAMERA.fov} />
        <Lights />
        <Suspense fallback={null}>
          <Model progress={progress} />
          <ContactShadows
            position={[0, -1.78, 0]}
            opacity={0.55}
            scale={12}
            blur={2.8}
            far={4}
            color="#7fb2ff"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL);
