"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSent(false);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_6xnb5g3",
        "template_1lfmnym",
        form.current,
        "3PyRiKcbWvw6C0JbO"
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          form.current?.reset();
        },
        (err) => {
          setError("Failed to send message. Please try again.");
          setSending(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-[#23272f] py-20 px-6 lg:px-26 md:px-26 md:py-16 flex flex-col items-center"
    >
      <h4 className="text-md font-bold text-pink-400 mb-2 uppercase tracking-widest text-center">
        Contact
      </h4>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        Contact With Me
      </h2>
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* Left Card */}
        <div className="bg-[#1f232b] rounded-xl shadow-lg p-8 flex-1 flex flex-col items-center">
          <img
            src="/handshake.webp"
            alt="Handshake"
            className="rounded-lg mb-6 w-full h-40 object-cover"
          />
          <h3 className="text-white font-bold text-xl mb-1 text-center">
            Muhammad Sameed Shah
          </h3>
          <p className="text-gray-400 text-sm mb-2 text-center">
            Web Developer
          </p>
          <p className="text-gray-400 text-sm mb-4 text-center">
            I am available for freelance work. Connect with me via and call.
          </p>
          <div className="text-gray-400 text-md mb-1">
            <span className="font-bold">Phone:</span> +92 370 0589908
          </div>
          <div className="text-gray-400 text-md mb-4">
            <span className="font-bold">Email:</span> sameedshahdev@gmail.com
          </div>
          <div className="flex gap-3 mt-auto">
            <Link href="https://github.com/Sameedshah" target="_blank" className="bg-[#23272f] hover:bg-gray-700 text-gray-400 p-2 rounded-lg transition-colors">
              <FiGithub className="w-5 h-5" />
            </Link>
            <Link href="https://pk.linkedin.com/in/muhammad-sameed-shah" target="_blank" className="bg-[#23272f] hover:bg-gray-700 text-gray-400 p-2 rounded-lg transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </Link>
            <Link href="https://x.com/Sameeddev" target="_blank" className="bg-[#23272f] hover:bg-gray-700 text-gray-400 p-2 rounded-lg transition-colors">
              <FiTwitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
        {/* Right Form */}
        <form
          ref={form}
          onSubmit={handleSend}
          className="bg-[#1f232b] rounded-xl shadow-lg p-8 flex-1 flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                Your Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full bg-[#23272f] text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-cyan-300"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
                Phone Number
              </label>
              <input
                type="text"
                name="user_phone"
                className="w-full bg-[#23272f] text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-cyan-300"
                placeholder="Enter your phone"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full bg-[#23272f] text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-cyan-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              className="w-full bg-[#23272f] text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-cyan-300"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">
              Your Message
            </label>
            <textarea
              rows={5}
              name="message"
              required
              className="w-full bg-[#23272f] text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-cyan-300"
              placeholder="Type your message"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-2 bg-[#23272f] border border-cyan-300 text-cyan-300 hover:bg-cyan-300 hover:text-[#23272f] font-semibold rounded-md py-3 transition-colors duration-200"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
          {sent && (
            <p className="text-green-400 text-center mt-2">Message sent successfully!</p>
          )}
          {error && (
            <p className="text-red-400 text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;