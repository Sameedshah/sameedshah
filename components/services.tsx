"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const whatido = [
  {
    title: "Web Development",
    description:
      "I create beautiful, responsive websites that are optimized for performance and user experience.",
  },
  {
    title: "UI/UX Design",
    description:
      "I design intuitive and engaging user interfaces that enhance the user experience across all devices.",
  },
  {
    title: "SEO Optimization",
    description:
      "I optimize websites for search engines to improve visibility and drive organic traffic.",
  },
  {
    title: "Python Automation",
    description:
      "I automate repetitive tasks using Python, saving you time and increasing efficiency.",
  },
  {
    title: "AI Agents",
    description:
      "I am currently learning about AI agents and how they can be used to enhance user interactions and automate tasks.",
  },
  {
    title: "UX Consulting",
    description:
      "A UX consultant is responsible for many of the same tasks as a UX designer, but they typically...",
  },
];

export const Services = () => {
  return (
    <section id="services" className="bg-[#23272f] py-20 px-6 lg:px-26 md:px-26 md:py-16">
      <h4 className="text-md md:text-md font-bold text-cyan-300 mb-4">
        Services
      </h4>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        What I Do
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {whatido.map((service, index) => (
          <div
            key={index}
            className="group relative bg-[#1f232b] hover:bg-[#1a1d23] text-white p-6 rounded-xl transition duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-cyan-500/10"
          >
            {/* Circle */}
            <div className="w-6 h-6 border-2 border-cyan-300 rounded-full mb-4 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400" />

            {/* Title */}
            <h3 className="font-semibold text-lg text-white mb-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              {service.description}
            </p>

            {/* Arrow on Hover */}
            <Link href={'#contact'}>
              <div className="opacity-0 group-hover:opacity-100 mt-4 text-cyan-300 text-sm flex items-center gap-2 transition-all duration-200">
                Let&apos;s Talk <FiArrowRight className="text-base" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;
