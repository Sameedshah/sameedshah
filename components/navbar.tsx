"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const offsets = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, offset: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, offset: Math.abs(rect.top) };
      });
      const closest = offsets.reduce((a, b) => (a.offset < b.offset ? a : b));
      setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="dark:bg-[#23272f]  fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex flex-wrap items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="#home"
          scroll={false}
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={(e) => {
            e.preventDefault();
            handleSmoothScroll("home");
          }}
        >
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            Sameed<span className="text-cyan-300">shah_.</span>
          </span>
        </Link>

        {/* Hamburger menu button (mobile only) */}
        <button
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-sticky"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Hire Me button (hidden on mobile) */}
        <div className="hidden md:flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            href="/SAMEEDWEBDEV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-900 bg-cyan-300 hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-cyan-400 dark:hover:bg-cyan-400 dark:focus:ring-cyan-800 transition-colors duration-200"
          >
            <FiDownload className="w-5 h-5" />
            <span>Resume</span>
          </Link>
        </div>

        {/* Responsive menu */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? "flex" : "hidden"
            }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#23272f] md:dark:bg-[#23272f] dark:border-gray-700">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(item.id);
                  }}
                  className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 transition-colors duration-200 ${activeSection === item.id
                    ? "text-cyan-300 font-bold"
                    : "text-white hover:text-cyan-300"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
