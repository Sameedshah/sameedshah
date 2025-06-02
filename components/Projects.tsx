"use client";
import React from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

const projects = [
    {
        title: "EvoAcademy School Website",
        description:
            "A comprehensive frontend-only educational platform.",
        image: "/pr1.webp",
        previewUrl: "https://sameedshah.github.io/evoacademy/index.html",
        codeUrl: "https://github.com/Sameedshah/evoacademy",
        tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    },
    {
        title: "Vidify Ai SAAS Application",
        description:
            "A fully functional Ai SAAS Application for Image, Video, Music, Code, Audio Generation.",
        image: "/vidify.jpg",
        previewUrl: "https://vidify-ai.vercel.app/",
        codeUrl: "https://github.com/Sameedshah/vidifyai",
        tags: ["NextJs", "TailwindCSS", "OpenAi", "TypeScript"],
    },
    {
        title: "Financial Assistant Ai",
        description:
            "A fully functional Ai Assistant for financial tasks, Data Analysis, Data Visualization.",
        image: "/visual.jpg",
        previewUrl: "https://visualai-eight.vercel.app/",
        codeUrl: "https://github.com/Sameedshah/financial-data-analyst",
        tags: ["NextJs", "TailwindCSS", "Anthropic", "TypeScript", "Chart.js", "ClaudeAI"],
    },
    {
        title: "E Commerce Website",
        description:
            "A fully functional E Commerce Website for online shopping, product listings, and payment processing.",
        image: "/ecom.webp",
        previewUrl: "",
        codeUrl: "",
        tags: ["NextJs", "TailwindCSS", "TypeScript", "Prisma", "Stripe"],
    },
];

const Projects = () => {
    return (
        <section id="projects" className="bg-[#1f232b] py-20 px-6 lg:px-26 md:px-26 md:py-16">
            <div className="text-center mb-12">
                <h4 className="text-md md:text-md font-bold text-pink-400 mb-4">Projects</h4>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    <span className="text-white">My </span>
                    <span className="text-cyan-300">Portfolio</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className="group relative bg-[#23272f] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-200"
                    >
                        {/* Screenshot */}
                        <div className="relative h-56 md:h-64 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-all duration-300 group-hover:opacity-30"
                            />
                            {/* Preview & Github Buttons on Hover */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <Link
                                    href={project.previewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                >
                                    <span className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-pink-600 transition">
                                        <FiExternalLink className="text-lg" />
                                        Preview
                                    </span>
                                </Link>
                                <Link
                                    href={project.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                >
                                    <span className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-pink-600 transition">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5"
                                        >
                                            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                                        </svg>
                                        Github
                                    </span>
                                </Link>
                            </div>
                        </div>
                        {/* Card Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-pink-400 mb-2">{project.title}</h3>
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-pink-100 text-pink-500 text-xs px-2 py-1 rounded font-semibold"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;