"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import SelectionCard from "@/components/Selection/SelectionCard";
import ActionButtons from "@/components/Layout/ActionButtons";
import { services } from "@/data/services";
import { departments } from "@/data/departments";
import { states } from "@/data/states";
import { branches } from "@/data/branches";
import { getServicesByDepartment } from "@/data/services";

const ServiceSelectionContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [availableServices, setAvailableServices] = useState<typeof services>(
    []
  );

  useEffect(() => {
    const departmentId = searchParams.get("department");
    const stateId = searchParams.get("state");
    const branchId = searchParams.get("branch");

    if (!departmentId || !stateId || !branchId) {
      router.push("/");
      return;
    }

    const deptId = parseInt(departmentId);
    const stateIdNum = parseInt(stateId);
    const branchIdNum = parseInt(branchId);

    const department = departments.find((d) => d.id === deptId);
    const state = states.find((s) => s.id === stateIdNum);
    const branch = branches.find((b) => b.id === branchIdNum);

    if (!department || !state || !branch) {
      router.push("/");
      return;
    }

    setSelectedDepartment(deptId);
    setSelectedState(stateIdNum);
    setSelectedBranch(branchIdNum);

    // Get services for this department
    const servicesForDepartment = getServicesByDepartment(deptId);
    setAvailableServices(servicesForDepartment);
  }, [searchParams, router]);

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  const handleNext = () => {
    if (
      selectedDepartment &&
      selectedState &&
      selectedBranch &&
      selectedService
    ) {
      router.push(
        `/user-category?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}&service=${selectedService}`
      );
    }
  };

  const handleBack = () => {
    router.push(
      `/branch-selection?department=${selectedDepartment}&state=${selectedState}`
    );
  };

  if (!selectedDepartment || !selectedState || !selectedBranch) return null;

  const selectedDepartmentData = departments.find(
    (d) => d.id === selectedDepartment
  );
  const selectedStateData = states.find((s) => s.id === selectedState);
  const selectedBranchData = branches.find((b) => b.id === selectedBranch);

  const breadcrumbItems = [
    { label: "Home", onClick: () => router.push("/") },
    {
      label: "Pilih Negeri",
      onClick: () =>
        router.push(`/state-selection?department=${selectedDepartment}`),
    },
    {
      label: "Pilih Lokasi",
      onClick: () =>
        router.push(
          `/branch-selection?department=${selectedDepartment}&state=${selectedState}`
        ),
    },
    { label: "Pilih Servis" },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <Header
        title="Pilih Servis"
        subtitle={`Pilih servis yang anda perlukan di ${selectedBranchData?.name}`}
      />

      <div className="px-8 py-6">
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Jabatan:</strong> {selectedDepartmentData?.full_name}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Negeri:</strong> {selectedStateData?.name}
          </p>
          <p className="text-sm text-blue-800">
            <strong>Lokasi:</strong> {selectedBranchData?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableServices.map((service) => (
            <SelectionCard
              key={service.id}
              id={service.id.toString()}
              title={service.name}
              subtitle={service.description}
              status={service.priority ? "Priority" : "Regular"}
              isSelected={selectedService === service.id}
              onClick={() => handleServiceSelect(service.id)}
            />
          ))}
        </div>

        {availableServices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Tiada servis tersedia untuk jabatan ini.
            </p>
          </div>
        )}
      </div>

      <ActionButtons
        onBack={handleBack}
        onNext={handleNext}
        backText="Kembali"
        nextText="Seterusnya: Ambil Nombor"
        disabled={!selectedService}
      />
    </PageContainer>
  );
};

const ServiceSelectionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceSelectionContent />
    </Suspense>
  );
};

export default ServiceSelectionPage;
