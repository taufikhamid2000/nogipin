"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Dummy branch data (Replace with actual API call later)
const branches = [
  { id: "branch-1", name: "JPN Shah Alam" },
  { id: "branch-2", name: "JPJ Petaling Jaya" },
  { id: "branch-3", name: "JIM Kuala Lumpur" },
  { id: "branch-4", name: "PDRM Kajang" },
];

const BranchSelectionPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  useEffect(() => {
    const service = searchParams.get("service");
    const state = searchParams.get("state");

    if (!service || !state) {
      router.push("/"); // Redirect to homepage if missing parameters
    } else {
      setSelectedService(service);
      setSelectedState(state);
    }
  }, [searchParams, router]);

  const handleBranchSelect = (branchId: string) => {
    router.push(`/queue-status?service=${selectedService}&state=${selectedState}&branch=${branchId}`);
  };

  if (!selectedService || !selectedState) return null; // Prevent rendering if missing data

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-lg">
        <span className="text-gray-300">Service:</span> <span className="font-semibold">{selectedService}</span> &gt;
        <span className="text-gray-300 ml-2">State:</span> <span className="font-semibold">{selectedState}</span>
      </nav>

      <h1 className="text-4xl font-semibold text-center mb-8">
        Choose a Branch
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => handleBranchSelect(branch.id)}
            className="p-4 rounded-lg text-xl font-semibold bg-gray-800 text-white hover:bg-blue-500 transition-all"
          >
            {branch.name}
          </button>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => router.push(`/state-selection?service=${selectedService}`)}
          className="px-6 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
        >
          &larr; Back to State Selection
        </button>
      </div>
    </div>
  );
};

export default BranchSelectionPage;
