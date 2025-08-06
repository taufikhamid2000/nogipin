"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import SelectionCard from "@/components/Selection/SelectionCard";
import ActionButtons from "@/components/Layout/ActionButtons";
import { branches } from "@/data/branches";
import { departments } from "@/data/departments";
import { states } from "@/data/states";
import { getBranchesByDepartmentAndState } from "@/data/branches";

const BranchSelectionContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [availableBranches, setAvailableBranches] = useState<typeof branches>(
    []
  );

  useEffect(() => {
    const departmentId = searchParams.get("department");
    const stateId = searchParams.get("state");

    if (!departmentId || !stateId) {
      router.push("/");
      return;
    }

    const deptId = parseInt(departmentId);
    const stateIdNum = parseInt(stateId);

    const department = departments.find((d) => d.id === deptId);
    const state = states.find((s) => s.id === stateIdNum);

    if (!department || !state) {
      router.push("/");
      return;
    }

    setSelectedDepartment(deptId);
    setSelectedState(stateIdNum);

    // Get branches for this department and state
    const branchesForDeptAndState = getBranchesByDepartmentAndState(
      deptId,
      stateIdNum
    );
    setAvailableBranches(branchesForDeptAndState);
  }, [searchParams, router]);

  const handleBranchSelect = (branchId: number) => {
    setSelectedBranch(branchId);
  };

  const handleNext = () => {
    if (selectedDepartment && selectedState && selectedBranch) {
      router.push(
        `/service-selection?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}`
      );
    }
  };

  const handleBack = () => {
    router.push(`/state-selection?department=${selectedDepartment}`);
  };

  if (!selectedDepartment || !selectedState) return null;

  const selectedDepartmentData = departments.find(
    (d) => d.id === selectedDepartment
  );
  const selectedStateData = states.find((s) => s.id === selectedState);

  const breadcrumbItems = [
    { label: "Home", onClick: () => router.push("/") },
    {
      label: "Pilih Negeri",
      onClick: () =>
        router.push(`/state-selection?department=${selectedDepartment}`),
    },
    { label: "Pilih Lokasi" },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <Header
        title="Pilih Lokasi"
        subtitle={`Pilih lokasi ${selectedDepartmentData?.name} di ${selectedStateData?.name}`}
      />

      <div className="px-8 py-6">
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Jabatan:</strong> {selectedDepartmentData?.full_name}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Negeri:</strong> {selectedStateData?.name}
          </p>
        </div>

        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Maklumat:</strong> Sebahagian Lokasi masih dalam proses
            integrasi ke sistem MyBeratur. Maaf atas kesulitan.
          </p>
        </div>

        {availableBranches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Tiada lokasi tersedia untuk jabatan ini di negeri yang dipilih.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableBranches.map((branch) => (
              <SelectionCard
                key={branch.id}
                id={branch.id.toString()}
                title={branch.name}
                subtitle={branch.address}
                status={branch.status}
                distance={branch.distance}
                queueCount={branch.total_queue}
                isSelected={selectedBranch === branch.id}
                onClick={() => handleBranchSelect(branch.id)}
              />
            ))}
          </div>
        )}
      </div>

      <ActionButtons
        onBack={handleBack}
        onNext={handleNext}
        backText="Kembali"
        nextText="Seterusnya: Pilih Servis"
        disabled={!selectedBranch}
      />
    </PageContainer>
  );
};

const BranchSelectionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BranchSelectionContent />
    </Suspense>
  );
};

export default BranchSelectionPage;
