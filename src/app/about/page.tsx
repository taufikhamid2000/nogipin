/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-semibold text-center text-white mb-8">
        About Our Queue System
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-gray-300 mb-4">
          Our queue system is designed to efficiently manage service lines while
          prioritizing fairness and accessibility.
        </p>
        <ul className="list-disc pl-5 text-gray-300 space-y-2">
          <li>
            Queue numbers reset every day at <strong>6 PM</strong>.
          </li>
          <li>
            Estimated waiting time is calculated based on the number of open
            counters and service speed.
          </li>
          <li>Missed turn numbers are requeued in a separate lane.</li>
          <li>
            Each branch has a queue capacity limit—once full, no more numbers
            will be issued.
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Queue Lanes</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3 text-gray-300">Prefix</th>
              <th className="p-3 text-gray-300">Lane Type</th>
              <th className="p-3 text-gray-300">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-600">
              <td className="p-3">1xxx</td>
              <td className="p-3">Special Needs</td>
              <td className="p-3">Elderly, Disabled, Pregnant</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="p-3">2xxx</td>
              <td className="p-3">Walk-Ins</td>
              <td className="p-3">General Public</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="p-3">3xxx</td>
              <td className="p-3">Missed Turn Requeue</td>
              <td className="p-3">Merged with Walk-Ins</td>
            </tr>
            <tr className="border-b border-gray-600">
              <td className="p-3">4xxx - 6xxx</td>
              <td className="p-3">Online Booking</td>
              <td className="p-3">Standard online queue</td>
            </tr>
            <tr>
              <td className="p-3">7xxx - 9xxx</td>
              <td className="p-3">Additional Online Lane</td>
              <td className="p-3">Available if extra staff</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Booking Process</h2>
        <ol className="list-decimal pl-5 text-gray-300 space-y-2">
          <li>
            Click <strong>"Take Number"</strong> on the homepage.
          </li>
          <li>Confirm your queue request.</li>
          <li>
            Receive your queue number, branch details, and estimated wait time.
          </li>
        </ol>
      </div>

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
