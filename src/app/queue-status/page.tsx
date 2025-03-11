/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Branch info with capacity and crowd status
const branchData: {
  [key: string]: {
    name: string;
    capacity: number;
    status: string;
    alternative?: string;
  };
} = {
  "branch-1": {
    name: "JPN Klang",
    capacity: 6,
    status: "Crowded",
    alternative: "JPN Shah Alam",
  },
  "branch-2": { name: "JPJ Petaling Jaya", capacity: 8, status: "Moderate" },
  "branch-3": { name: "JIM Kuala Lumpur", capacity: 10, status: "Busy" },
  "branch-4": { name: "PDRM Kajang", capacity: 4, status: "Light" },
};

const QueueStatusPage = () => {
  return (
    <Suspense
      fallback={<div className="text-white text-center mt-10">Loading...</div>}
    >
      <QueueStatusContent />
    </Suspense>
  );
};

const QueueStatusContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [selectedBranchName, setSelectedBranchName] = useState<string | null>(
    null
  );
  const [branchCapacity, setBranchCapacity] = useState<number | null>(null);
  const [queueStatus, setQueueStatus] = useState<string | null>(null);
  const [alternativeBranch, setAlternativeBranch] = useState<string | null>(
    null
  );
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"queue" | "prefix" | "ticket">("queue");

  useEffect(() => {
    const service = searchParams.get("service");
    const state = searchParams.get("state");
    const branchId = searchParams.get("branch");

    if (!service || !state || !branchId) {
      router.push("/"); // Redirect if missing parameters
    } else {
      setSelectedService(service);
      setSelectedState(state);
      setSelectedBranchId(branchId);

      const branchInfo = branchData[branchId];
      if (branchInfo) {
        setSelectedBranchName(branchInfo.name);
        setBranchCapacity(branchInfo.capacity);
        setQueueStatus(branchInfo.status);
        setAlternativeBranch(branchInfo.alternative || null);
      }
    }
  }, [searchParams, router]);

  const handleChangeBranch = () => {
    router.push(
      `/branch-selection?service=${selectedService}&state=${selectedState}`
    );
  };

  const handleConfirmStay = () => {
    setStep("prefix");
  };

  const handleSelectPrefix = (prefix: string) => {
    const newQueueNumber = 3120 + 31; // Example logic (current number + people in queue)
    const estimatedMinutes = 135; // Example estimate (2 hours 15 min)
    const estimatedArrival = "1:32 PM";

    setQueueNumber(newQueueNumber);
    setEstimatedTime(`${estimatedMinutes} min (${estimatedArrival})`);
    setStep("ticket");
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel your queue number?")) {
      router.push("/"); // Redirect back to home
    }
  };

  if (
    !selectedService ||
    !selectedState ||
    !selectedBranchId ||
    !selectedBranchName
  ) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 lg:mt-20 p-6 bg-gradient-to-r from-indigo-900 to-blue-800 text-white rounded-lg shadow-lg">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-lg">
        <span className="text-gray-300">Service:</span>{" "}
        <span className="font-semibold">{selectedService}</span> &gt;
        <span className="text-gray-300 ml-2">State:</span>{" "}
        <span className="font-semibold">{selectedState}</span> &gt;
        <span className="text-gray-300 ml-2">Branch:</span>{" "}
        <span className="font-semibold">{selectedBranchName}</span>
      </nav>

      <h1 className="text-4xl font-semibold text-center mb-8">
        Queue Status - {selectedBranchName}
      </h1>

      <div className="text-center text-lg">
        <p>
          Branch Capacity: <strong>{branchCapacity} counters</strong>
        </p>
        <p>
          Current Number: <strong>3120</strong>
        </p>
        <p>
          People in Queue: <strong>30</strong>
        </p>
        <p>
          Status:{" "}
          <span
            className={
              queueStatus === "Crowded" ? "text-red-400" : "text-green-400"
            }
          >
            {queueStatus}
          </span>
        </p>
      </div>

      {/* Step 1: Crowded Branch Warning */}
      {step === "queue" && queueStatus === "Crowded" && alternativeBranch && (
        <div className="mt-6 text-center">
          <p className="text-yellow-300">
            The branch seems crowded, would you like to switch to{" "}
            {alternativeBranch}? (10 minutes away)
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handleChangeBranch}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg"
            >
              Yes, Change Branch
            </button>
            <button
              onClick={handleConfirmStay}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              No, Stay Here
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Prefix */}
      {step === "prefix" && (
        <div className="mt-6 text-center">
          <p className="text-yellow-300">Select your queue category:</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => handleSelectPrefix("priority")}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg"
            >
              Elderly, Disabled & Pregnant
            </button>
            <button
              onClick={() => handleSelectPrefix("general")}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-lg"
            >
              Others
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Ticket Confirmation */}
      {step === "ticket" && (
        <div className="mt-6 text-center">
          <p>
            Your number:{" "}
            <strong className="text-yellow-300">{queueNumber}</strong>
          </p>
          <p>
            Estimated time: <strong>{estimatedTime}</strong>
          </p>
          <button
            onClick={handleCancel}
            className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default QueueStatusPage;
