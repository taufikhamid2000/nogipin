"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import SelectionCard from "@/components/Selection/SelectionCard";
import ActionButtons from "@/components/Layout/ActionButtons";
import { states } from "@/data/states";
import { departments } from "@/data/departments";
import { getBranchesByDepartment } from "@/data/branches";

const StateSelectionContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [availableStates, setAvailableStates] = useState<typeof states>([]);

  useEffect(() => {
    const departmentId = searchParams.get("department");
    if (!departmentId) {
      router.push("/");
      return;
    }

    const deptId = parseInt(departmentId);
    const department = departments.find((d) => d.id === deptId);
    if (!department) {
      router.push("/");
      return;
    }

    setSelectedDepartment(deptId);

    // Get states that have branches for this department
    const departmentBranches = getBranchesByDepartment(deptId);
    const stateIds = [
      ...new Set(departmentBranches.map((branch) => branch.state_id)),
    ];
    const availableStatesList = states.filter((state) =>
      stateIds.includes(state.id)
    );
    setAvailableStates(availableStatesList);
  }, [searchParams, router]);

  const handleStateSelect = (stateId: number) => {
    setSelectedState(stateId);
  };

  const handleNext = () => {
    if (selectedDepartment && selectedState) {
      router.push(
        `/branch-selection?department=${selectedDepartment}&state=${selectedState}`
      );
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!selectedDepartment) return null;

  const selectedDepartmentData = departments.find(
    (d) => d.id === selectedDepartment
  );

  const breadcrumbItems = [
    { label: "Home", onClick: () => router.push("/") },
    { label: "Pilih Negeri" },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <Header
        title="Pilih Negeri"
        subtitle={`Pilih negeri untuk ${selectedDepartmentData?.full_name}`}
      />

      <div className="px-8 py-6">
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Jabatan yang dipilih:</strong>{" "}
            {selectedDepartmentData?.full_name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableStates.map((state) => (
            <SelectionCard
              key={state.id}
              id={state.id.toString()}
              title={state.name}
              subtitle={`${state.code} - ${state.name}`}
              isSelected={selectedState === state.id}
              onClick={() => handleStateSelect(state.id)}
            />
          ))}
        </div>
      </div>

      <ActionButtons
        onBack={handleBack}
        onNext={handleNext}
        backText="Kembali"
        nextText="Seterusnya: Pilih Lokasi"
        disabled={!selectedState}
      />
    </PageContainer>
  );
};

const StateSelectionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StateSelectionContent />
    </Suspense>
  );
};

export default StateSelectionPage;
