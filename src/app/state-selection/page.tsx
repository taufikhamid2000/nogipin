"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const states = [
  { id: "selangor", name: "Selangor" },
  { id: "kuala-lumpur", name: "Kuala Lumpur" },
  { id: "johor", name: "Johor" },
  { id: "penang", name: "Penang" },
  { id: "sabah", name: "Sabah" },
  { id: "sarawak", name: "Sarawak" },
];

const services: { [key: string]: string } = {
  ic: "IC Renewal",
  license: "Driver's License",
  passport: "Passport Application",
  summon: "Summon Payment",
};

const StateSelectionPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    const service = searchParams.get("service");
    if (!service || !services[service]) {
      router.push("/"); // Redirect to homepage if no service is selected
    } else {
      setSelectedService(service);
    }
  }, [searchParams, router]);

  const handleStateSelect = (stateId: string) => {
    setSelectedState(stateId);
  };

  const handleNext = () => {
    if (selectedService && selectedState) {
      router.push(`/branch-selection?service=${selectedService}&state=${selectedState}`);
    }
  };

  const handleBack = () => {
    router.push("/"); // Go back to service selection
  };

  if (!selectedService) return null; // Prevent rendering if no service is selected

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      {/* Breadcrumbs */}
      <nav className="text-gray-300 mb-6">
        <span className="cursor-pointer hover:text-white" onClick={() => router.push("/")}>Home</span>  
        {" > "}
        <span className="font-bold">Choose State</span>
      </nav>

      {/* Show selected service */}
      <div className="mb-4 text-center">
        <p className="text-lg">You selected:</p>
        <p className="text-2xl font-semibold text-yellow-300">{services[selectedService]}</p>
      </div>

      <h1 className="text-4xl font-semibold text-center mb-8">Choose Your State</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => handleStateSelect(state.id)}
            className={`p-4 rounded-lg text-xl font-semibold transition-all ${
              selectedState === state.id
                ? "bg-blue-600 text-white scale-105" // Highlight selected state
                : "bg-gray-800 text-white hover:bg-blue-500"
            }`}
          >
            {state.name}
          </button>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!selectedState}
          className={`px-6 py-3 rounded-lg font-medium text-white transition duration-300 ease-in-out ${
            selectedState
              ? "bg-green-600 hover:bg-green-700 transform hover:scale-105"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Next: Choose Branch
        </button>
      </div>
    </div>
  );
};

export default StateSelectionPage;
