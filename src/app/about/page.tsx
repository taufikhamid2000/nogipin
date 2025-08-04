/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Melayu from "./components/melayu";
import English from "./components/english";

const AboutPage = () => {
  const [selectedVersion, setSelectedVersion] = useState("Melayu");

  const renderContent = () => {
    switch (selectedVersion) {
      case "english":
        return <English />;
      default:
        return <Melayu />;
    }
  };

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-semibold text-center text-white mb-8">
        About MyBeratur
      </h1>
      <h5 className="text-1xl font-semibold text-center text-white mb-8">
        These are AI generated, please don't take them seriously.
      </h5>

      {/* Language Buttons */}
      <div className="flex justify-center space-x-3 mb-6">
        <button
          onClick={() => setSelectedVersion("Melayu")}
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            selectedVersion === "Melayu" ? "bg-blue-600" : "bg-gray-700"
          } hover:bg-blue-700 transition duration-300`}
        >
          Bahasa Malaysia
        </button>
        <button
          onClick={() => setSelectedVersion("english")}
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            selectedVersion === "english" ? "bg-blue-600" : "bg-gray-700"
          } hover:bg-blue-700 transition duration-300`}
        >
          English
        </button>
      </div>

      {/* Content Display */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        {renderContent()}
      </div>

      {/* Back to Home */}
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
