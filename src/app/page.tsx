"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const services = [
  { id: "ic", name: "IC Renewal" },
  { id: "license", name: "Driver’s License Renewal" },
  { id: "passport", name: "Passport Renewal" },
  { id: "saman", name: "Saman Payment" },
];

const HomePage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (selectedService) {
      router.push(`/state-selection?service=${selectedService}`);
    }
  };

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Choose a Service
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`p-4 rounded-lg text-xl font-semibold transition-all ${
              selectedService === service.id
                ? "bg-blue-600 text-white scale-105" // Highlight selected option
                : "bg-gray-800 text-white hover:bg-blue-500"
            }`}
          >
            {service.name}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleNext}
          disabled={!selectedService}
          className={`px-6 py-3 rounded-lg font-medium text-white transition duration-300 ease-in-out ${
            selectedService
              ? "bg-green-600 hover:bg-green-700 transform hover:scale-105"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Next: Choose State
        </button>
      </div>
    </div>
  );
};

export default HomePage;
