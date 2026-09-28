/* ============================================================================
 *  SINGLE SOURCE OF TRUTH
 *  ---------------------------------------------------------------------------
 *  Every word, link and image on this site comes from this file.
 *  Edit here and the whole portfolio updates. Nothing else to touch.
 *
 *  Lines marked  // ⚠️ CONFIRM  are ones I filled in from your Upwork profile
 *  or guessed — check them before you deploy.
 * ========================================================================== */

export const config = {
  /* ----------------------------------------------------------------- HERO */
  developer: {
    name: 'Sameed',
    fullName: 'Sameed Shah',
    title: 'Agentic AI Engineer',
    greeting: "Hello! I'm",
    // The hero carousel cycles through these, two at a time, forever.
    // Keep them short — this line is set large and deliberately bleeds off the
    // right edge, but anything past ~20 characters loses the second word.
    roles: ['AGENTIC AI ENGINEER', 'AI SYSTEMS ARCHITECT', 'FULL-STACK DEVELOPER'],
    location: 'Karachi, Pakistan',
  },

  /* -------------------------------------------------------------- CONTACT */
  contact: {
    email: 'work.cloudex@gmail.com', // ⚠️ CONFIRM — this goes public
    location: 'Karachi, Pakistan',
    upwork: 'https://www.upwork.com/freelancers/~019cc8aaea2bf997e0',
    github: 'https://github.com/Sameedshah',
    linkedin: 'https://www.linkedin.com/in/muhammad-sameed-shah',
    x: 'https://x.com/Sameeddev',
    resume: '/resume.pdf', // ⚠️ drop your PDF into /public
  },

  /* ---------------------------------------------------------------- ABOUT */
  about: {
    title: 'About Me',
    description:
      "I build AI employees — autonomous workers that finish real tasks end to end, " +
      'not chatbots that answer questions. Every agent I ship gets a defined role, ' +
      'real tool access through MCP, and decision boundaries a business can actually ' +
      'hold it to. Trained through the Agent Factory program in agentic architecture, ' +
      'and eight years deep in shipping production web. I care about the boring part ' +
      'everyone skips: evaluation, oversight, and output you can trust.',
  },

  /* ----------------------------------------------------------- WHAT I DO */
  whatIDo: [
    {
      title: 'AGENTIC AI',
      subtitle: 'AI employees that finish the work',
      description:
        'Designing multi-agent systems with clear roles, real tool access and human ' +
        'checkpoints. MCP integrations that connect agents to your actual data, ' +
        'spec-driven builds, and evaluation harnesses so the output holds up in ' +
        'production — not just in a demo.',
      tags: [
        'Claude Agent SDK',
        'MCP',
        'OpenAI Agents SDK',
        'Multi-Agent',
        'LangGraph',
        'Evals',
        'Python',
        'FastAPI',
      ],
    },
    {
      title: 'FULL-STACK',
      subtitle: 'Production web, shipped fast',
      description:
        'Jamstack sites and web apps that load fast and stay maintainable. Next.js ' +
        'and React front to back, typed end to end, with Postgres or Supabase behind ' +
        'them and a deploy pipeline that does not need babysitting.',
      tags: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind',
        'Supabase',
        'PostgreSQL',
        'Node.js',
        'Vercel',
      ],
    },
  ],

  /* ------------------------------------------------------------- CAREER */
  // Newest first. `period` containing "Present" renders as NOW.
  experiences: [
    {
      position: 'Agentic AI Engineer',
      company: 'Cloudex Technologies LTD',
      period: '2026 - Present',
      description:
        'Building enterprise AI employees — autonomous agents with defined roles, ' +
        'tool access and human oversight — and the MCP infrastructure they run on.',
    },
    {
      position: 'AI Native Software Engineering',
      company: 'Presidential Initiative for AI & Computing',
      period: '2025',
      description:
        'Agent Factory program: agentic architecture, Model Context Protocol, ' +
        'Claude Agent SDK, and multi-agent systems built to survive production.',
    },
    {
      position: 'Web Developer · Jamstack',
      company: 'Self-employed',
      period: '2022 - Present',
      description:
        'Shipping websites and AI integrations for corporate clients. Next.js, ' +
        'React and Tailwind, from first wireframe through to live deploy.',
    },
    {
      position: 'Associate Degree',
      company: 'Memon Industrial & Technical Institute',
      period: '2022',
      description:
        'Where the fundamentals got hammered in — systems, data structures, and ' +
        'the habit of taking things apart to see how they actually work.',
    },
  ],

  /* -------------------------------------------------------------- WORK */
  // Images live in /public/images/ (WebP); originals from Codex are in /generated-images/.
  projects: [
    {
      name: 'Cloudex AI Insights',
      category: 'AI Agent',
      tools: 'Claude Agent SDK, MCP, Next.js, PostgreSQL',
      image: '/images/cloudex.webp',
      url: 'https://cloudex.tech',
    },
    {
      name: 'ProPac Solution',
      category: 'Web',
      tools: 'Next.js, Tailwind, Vercel',
      image: '/images/propac.webp',
      url: 'https://propacsolution.com',
    },
    {
      name: 'MIMA Group',
      category: 'Web',
      tools: 'Next.js, Tailwind, Headless CMS',
      image: '/images/mima.webp',
      url: 'https://mima.pk',
    },
    {
      name: "Domino's Voice Agent",
      category: 'Voice AI',
      tools: 'Realtime API, WebRTC, Python',
      image: '/images/voice-agent.webp',
      url: '',
    },
    {
      name: 'Meridian Finance',
      category: 'Mobile App',
      tools: 'Expo, React Native, Supabase',
      image: '/images/meridian.webp',
      url: '',
    },
    {
      name: 'MEXC Trade Signals',
      category: 'Trading AI',
      tools: 'MCP Server, Multi-Agent, Python',
      image: '/images/mexc.webp',
      url: '',
    },
  ],

  /* --------------------------------------------------------- TECH STACK */
  // Rendered as a centred pyramid. Row lengths shape the silhouette.
  techStack: [
    [
      { name: 'Python', icon: dev('python') },
      { name: 'TypeScript', icon: dev('typescript') },
      { name: 'JavaScript', icon: dev('javascript') },
      { name: 'React', icon: dev('react') },
      { name: 'Next.js', icon: dev('nextjs', 'original') },
      { name: 'Node.js', icon: dev('nodejs') },
      { name: 'FastAPI', icon: dev('fastapi') },
      { name: 'Tailwind', icon: dev('tailwindcss') },
      { name: 'HTML', icon: dev('html5') },
      { name: 'CSS', icon: dev('css3') },
    ],
    [
      { name: 'PostgreSQL', icon: dev('postgresql') },
      { name: 'Supabase', icon: dev('supabase') },
      { name: 'MongoDB', icon: dev('mongodb') },
      { name: 'Redis', icon: dev('redis') },
      { name: 'Docker', icon: dev('docker') },
      { name: 'Git', icon: dev('git') },
      { name: 'Vercel', icon: dev('vercel', 'original') },
      { name: 'Linux', icon: dev('linux') },
    ],
    [
      { name: 'PyTorch', icon: dev('pytorch') },
      { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/7fb2ff' },
      { name: 'OpenAI', icon: '/logos/openai.svg' },
      { name: 'Claude', icon: 'https://cdn.simpleicons.org/anthropic/7fb2ff' },
      { name: 'MCP', icon: 'https://cdn.simpleicons.org/modelcontextprotocol/7fb2ff' },
      { name: 'Three.js', icon: dev('threejs', 'original') },
    ],
    [
      { name: 'Figma', icon: dev('figma') },
      { name: 'Framer', icon: dev('framermotion') },
      { name: 'GSAP', icon: 'https://cdn.simpleicons.org/greensock/7fb2ff' },
      { name: 'Expo', icon: 'https://cdn.simpleicons.org/expo/7fb2ff' },
    ],
  ],
};

/** devicon CDN shorthand */
function dev(name, variant = 'original') {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;
}

export default config;
