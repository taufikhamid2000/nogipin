"use client";

import { useState } from "react";
import Link from "next/link";
import Formal from "./components/melayu";
import Deadpool from "./components/english";
import Rant from "./components/Rant";

const AboutPage = () => {
  const [contentType, setContentType] = useState<
    "formal" | "deadpool" | "rant"
  >("formal");

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-semibold text-center text-white mb-8">
        About MIEQS
      </h1>

      {/* Content Switcher */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 rounded-lg transition ${
            contentType === "formal"
              ? "bg-blue-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setContentType("formal")}
        >
          Bahasa Malaysia
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg transition ${
            contentType === "deadpool"
              ? "bg-red-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setContentType("deadpool")}
        >
          English
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg transition ${
            contentType === "rant"
              ? "bg-yellow-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setContentType("rant")}
        >
          Alien
        </button>
      </div>

      {/* Render selected content */}
      {contentType === "formal" && <Formal />}
      {contentType === "deadpool" && <Deadpool />}
      {contentType === "rant" && <Rant />}

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
