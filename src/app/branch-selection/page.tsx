"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Dummy branch data (Replace with API call later)
const branches = [
  { id: "branch-1", name: "JPN Shah Alam" },
  { id: "branch-2", name: "JPJ Petaling Jaya" },
  { id: "branch-3", name: "JIM Kuala Lumpur" },
  { id: "branch-4", name: "PDRM Kajang" },
];

const services: { [key: string]: string } = {
  ic: "IC Renewal",
  license: "Driver's License",
  passport: "Passport Application",
  summon: "Summon Payment",
};

const BranchSelectionPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  useEffect(() => {
    const service = searchParams.get("service");
    const state = searchParams.get("state");

    if (!service || !state || !services[service]) {
      router.push("/"); // Redirect if parameters are missing
    } else {
      setSelectedService(service);
      setSelectedState(state);
    }
  }, [searchParams, router]);

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
  };

  const handleNext = () => {
    if (selectedService && selectedState && selectedBranch) {
      router.push(
        `/queue-status?service=${selectedService}&state=${selectedState}&branch=${selectedBranch}`
      );
    }
  };

  const handleBack = () => {
    router.push(`/state-selection?service=${selectedService}`);
  };

  if (!selectedService || !selectedState) return null;

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      {/* Breadcrumbs */}
      <nav className="text-gray-300 mb-6">
        <span
          className="cursor-pointer hover:text-white"
          onClick={() => router.push("/")}
        >
          Home
        </span>
        {" > "}
        <span className="cursor-pointer hover:text-white" onClick={handleBack}>
          Choose State
        </span>
        {" > "}
        <span className="font-bold">Choose Branch</span>
      </nav>

      {/* Show selected service and state */}
      <div className="mb-4 text-center">
        <p className="text-lg">You selected:</p>
        <p className="text-2xl font-semibold text-yellow-300">
          {services[selectedService]}
        </p>
        <p className="text-xl font-semibold text-yellow-200">{selectedState}</p>
      </div>

      <h1 className="text-4xl font-semibold text-center mb-8">
        Choose a Branch
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => handleBranchSelect(branch.id)}
            className={`p-4 rounded-lg text-xl font-semibold transition-all ${
              selectedBranch === branch.id
                ? "bg-blue-600 text-white scale-105" // Highlight selected branch
                : "bg-gray-800 text-white hover:bg-blue-500"
            }`}
          >
            {branch.name}
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
          disabled={!selectedBranch}
          className={`px-6 py-3 rounded-lg font-medium text-white transition duration-300 ease-in-out ${
            selectedBranch
              ? "bg-green-600 hover:bg-green-700 transform hover:scale-105"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Next: Queue Status
        </button>
      </div>
    </div>
  );
};

export default BranchSelectionPage;
