/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Melayu from "./components/melayu";
import English from "./components/english";
import Rant from "./components/Rant";
import Lawyer from "./components/Lawyer";
import Einstein from "./components/Einstein";
import UpinIpin from "./components/UpinIpin";
import Cat from "./components/Cat";
import Alien from "./components/Alien";

const AboutPage = () => {
  const [selectedVersion, setSelectedVersion] = useState("Melayu");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderContent = () => {
    switch (selectedVersion) {
      case "english":
        return <English />;
      case "rant":
        return <Rant />;
      case "lawyer":
        return <Lawyer />;
      case "einstein":
        return <Einstein />;
      case "upinipin":
        return <UpinIpin />;
      case "cat":
        return <Cat />;
      case "alien":
        return <Alien />;
      default:
        return <Melayu />;
    }
  };

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-semibold text-center text-white mb-8">
        About MIEQS
      </h1>
      <h5 className="text-1xl font-semibold text-center text-white mb-8">
        These are AI generated, please don't take them seriously.
      </h5>

      {/* Language Buttons + Dropdown */}
      <div className="flex justify-center space-x-3 mb-6 relative">
        {/* Primary Language Buttons */}
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

        {/* Dropdown for Other Versions */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 rounded-lg font-medium text-white bg-gray-700 hover:bg-gray-600 transition duration-300"
          >
            More ▼
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-[200px] bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <button
                onClick={() => {
                  setSelectedVersion("rant");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
              >
                Rant
              </button>
              <button
                onClick={() => {
                  setSelectedVersion("lawyer");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
              >
                Lawyer
              </button>
              <button
                onClick={() => {
                  setSelectedVersion("einstein");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
              >
                Einstein
              </button>
              <button
                onClick={() => {
                  setSelectedVersion("upinipin");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
              >
                Upin Ipin
              </button>
              <button
                onClick={() => {
                  setSelectedVersion("cat");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
              >
                Cat
              </button>
              <button
                onClick={() => {
                  setSelectedVersion("alien");
                  setDropdownOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition duration-200"
              >
                Alien
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Display */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">{renderContent()}</div>

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
