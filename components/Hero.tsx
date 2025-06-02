"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiLinkedin, FiTwitter } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const roles = ["Web Developer", "Frontend Developer", "Ai Agents Developer"];

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY_AFTER_TYPING = 1200;

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), DELAY_AFTER_TYPING);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, displayed.length - 1));
      }, DELETING_SPEED);
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen px-4 sm:px-8 md:px-16 lg:px-26 py-10 md:py-16 bg-[#23272f]"
    >
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center h-full py-8 md:py-16">
        <span className="uppercase tracking-widest text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
          Welcome to my Portfolio
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
          Hi, I&apos;m <span className="text-pink-500">Sameed Shah</span>
          <br />
          <span className="text-white">
            a{" "}
            <span className="text-cyan-300">
              {displayed}
              <span className="border-r-2 border-cyan-300 animate-pulse ml-1"></span>
            </span>
          </span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-8 sm:mb-10">
          As a skilled developer with a passion for scalable digital experiences, I specialize in leveraging cutting-edge technologies and Ai to work on Clients Projects. With expertise in Python (Intermediate Level), Next.js, Tailwind CSS, TypeScript, and headless CMS Beginner, I offer end-to-end web development.
        </p>
        <div className="flex flex-wrap gap-6 sm:gap-8 mb-8">
          <div>
            <span className="block text-xs text-gray-400 mb-2 tracking-widest">
              FIND WITH ME
            </span>
            <div className="flex gap-3 sm:gap-4">
              <Link
                target="_blank"
                href="https://pk.linkedin.com/in/muhammad-sameed-shah"
                className="bg-[#23272f] hover:bg-gray-600 hover:text-white text-gray-400 p-2 sm:p-3 rounded-xl shadow transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
              </Link>
              <Link
                target="_blank"
                href="https://github.com/Sameedshah"
                className="bg-[#23272f] hover:bg-gray-600 hover:text-white text-gray-400 p-2 sm:p-3 rounded-xl shadow transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6 sm:w-8 sm:h-8" />
              </Link>
              <Link
                target="_blank"
                href="https://x.com/Sameeddev"
                className="bg-[#23272f] hover:bg-gray-600 hover:text-white text-gray-400 p-2 sm:p-3 rounded-xl shadow transition-colors duration-200"
                aria-label="Twitter"
              >
                <FiTwitter className="w-6 h-6 sm:w-8 sm:h-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex justify-end items-center py-8 md:py-16">
        <Image
          src="/pic.webp"
          width={1280}
          height={1280}
          alt="Sameed Shah"
          className="rounded-2xl shadow-2xl w-[220px] h-[280px] sm:w-[300px] sm:h-[380px] md:w-[350px] md:h-[450px] object-cover"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;