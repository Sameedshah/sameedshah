"use client";
import React, { useState } from "react";

const tabs = ["Education", "Skills", "Experience"];

const education = [
  {
    title: "BSc in Computer Science",
    subtitle: "Ilma University - (2025 - Present)",
    desc: "Currently pursuing my bachelor's degree with focus on advanced programming concepts, data structures & algorithms, database management systems, and software engineering principles. Gaining comprehensive knowledge in web development and object-oriented programming to strengthen my full-stack development expertise.",
    grade: "Nil",
  },
  {
    title: "DAE in Computer Information Technology",
    subtitle: "Memon Industrial & Technical Institute (2021 - 2024)",
    desc: "Completed comprehensive program in Computer Information Technology covering programming fundamentals, database systems, and core IT concepts. This foundation provided me with essential technical skills that I've successfully applied in my professional development career.",
    grade: "A Grade",
  },
  {
    title: "Matriculation with Science",
    subtitle: "Sarfaraz Pilot High School - (2019 - 2021)",
    desc: "Secondary education or post-primary education covers two phases on the International Standard Classification of Education scale.",
    grade: "B Grade",
  },
];

const skills = [
  {
    category: "Design Skill",
    items: [
      { name: "Adobe Photoshop", value: "70%" },
      { name: "Figma", value: "75%" },
      { name: "Creativity", value: "80%" },
      { name: "Adobe Illustrator", value: "50%" },
      { name: "Design", value: "90%" },
    ],
  },
  {
    category: "Development Skill",
    items: [
      { name: "Python", value: "65%" },
      { name: "Nextjs", value: "70%" },
      { name: "Reactjs", value: "65%" },
      { name: "Tailwind CSS", value: "78%" },
      { name: "TypeScript", value: "55%" },
    ],
  },
];

const experience = [
  {
    title: "Shopify Store Developer",
    subtitle: "Self-employed - (2024 - Present)",
    desc: "I can create and design shopify stores as Client's requirements",
    location: "Karachi",
  },
  {
    title: "Web Developer",
    subtitle: "Panaverse DAO - (2023 - 2024)",
    desc: "I developed websites on Panaverse DAO listed on my Projects",
    location: "Karachi",
  },
];

const Resume = () => {
  const [activeTab, setActiveTab] = useState("Education");

  return (
    <section id="about" className="bg-[#23272f] py-20 px-6 lg:px-26 md:px-26 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        My Resume
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-white font-medium transition-all duration-200 relative
              ${
                activeTab === tab
                  ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-cyan-300"
                  : "hover:text-cyan-300"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Wrapper with Fixed Min Height */}
      <div className="relative min-h-[600px] transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-6">
          {activeTab === "Education" &&
            education.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1f232b] p-6 rounded-xl text-white border-l-4 border-cyan-300 relative hover:scale-105 transition-transform duration-300"
              >
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{item.subtitle}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-2">
                  {item.desc}
                </p>
                <span className="absolute top-6 right-6 bg-[#191c23] text-red-400 text-xs px-2 py-1 rounded">
                  {item.grade}
                </span>
              </div>
            ))}

          {activeTab === "Skills" &&
            skills.map((skill, idx) => (
              <div
                key={idx}
                className="hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-white text-xl font-semibold mb-4">
                  {skill.category}
                </h3>
                {skill.items.map((item, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{item.name}</span>
                      <span className="text-sm text-gray-300">{item.value}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-pink-400"
                        style={{ width: item.value }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}

          {activeTab === "Experience" &&
            experience.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1f232b] p-6 rounded-xl text-white border-l-4 border-cyan-300 relative hover:scale-105 transition-transform duration-300"
              >
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{item.subtitle}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-2">
                  {item.desc}
                </p>
                <span className="absolute top-6 right-6 bg-[#191c23] text-red-400 text-xs px-2 py-1 rounded">
                  {item.location}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
