"use client";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => (
  <footer className="bg-[#1f232b] border-t border-[#23272f] px-6 py-8 md:py-10">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left: Logo & Name */}
      <div className="flex items-center gap-3">
        <img
          src="/pic.webp"
          alt="Sameed Shah"
          className="w-10 h-10 rounded-full object-cover border-2 border-cyan-300"
        />
        <span className="text-white font-bold text-lg tracking-wide">
          Sameed Shah
        </span>
      </div>
      {/* Center: Navigation */}
      <nav className="flex flex-wrap gap-5 text-gray-400 text-sm font-medium">
        <Link href="#home" className="hover:text-cyan-300 transition">Home</Link>
        <Link href="#about" className="hover:text-cyan-300 transition">About</Link>
        <Link href="#services" className="hover:text-cyan-300 transition">Services</Link>
        <Link href="#projects" className="hover:text-cyan-300 transition">Projects</Link>
        <Link href="#contact" className="hover:text-cyan-300 transition">Contact</Link>
      </nav>
      {/* Right: Socials */}
      <div className="flex gap-4">
        <Link href="https://github.com/Sameedshah" target="_blank" aria-label="GitHub">
          <FiGithub className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition" />
        </Link>
        <Link href="https://pk.linkedin.com/in/muhammad-sameed-shah" target="_blank" aria-label="LinkedIn">
          <FiLinkedin className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition" />
        </Link>
        <Link href="https://x.com/Sameeddev" target="_blank" aria-label="Twitter">
          <FiTwitter className="w-5 h-5 text-gray-400 hover:text-cyan-300 transition" />
        </Link>
      </div>
    </div>
    <div className="mt-8 text-center text-xs text-gray-500">
      &copy; {new Date().getFullYear()} Sameed Shah. All rights reserved.
    </div>
  </footer>
);

export default Footer;