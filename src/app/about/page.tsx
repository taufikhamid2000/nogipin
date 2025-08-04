/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import ActionButtons from "@/components/Layout/ActionButtons";
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
    <PageContainer>
      <Header 
        title="About MyBeratur"
        subtitle="Learn more about Malaysia's digital queuing system"
      />

      <div className="px-8 py-6">
        <div className="flex justify-center space-x-3 mb-6">
          <button
            onClick={() => setSelectedVersion("Melayu")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedVersion === "Melayu" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Bahasa Malaysia
          </button>
          <button
            onClick={() => setSelectedVersion("english")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedVersion === "english" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            English
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          {renderContent()}
        </div>
      </div>

      <ActionButtons
        onBack={() => window.history.back()}
        backText="Go Back"
      />
    </PageContainer>
  );
};

export default AboutPage;
