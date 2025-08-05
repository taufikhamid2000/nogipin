"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import SelectionCard from "@/components/Selection/SelectionCard";
import ActionButtons from "@/components/Layout/ActionButtons";
import { userCategories } from "@/data/userCategories";
import { departments } from "@/data/departments";
import { states } from "@/data/states";
import { branches } from "@/data/branches";
import { services } from "@/data/services";

const UserCategoryContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const departmentId = searchParams.get("department");
    const stateId = searchParams.get("state");
    const branchId = searchParams.get("branch");
    const serviceId = searchParams.get("service");

    if (!departmentId || !stateId || !branchId || !serviceId) {
      router.push("/");
      return;
    }

    const deptId = parseInt(departmentId);
    const stateIdNum = parseInt(stateId);
    const branchIdNum = parseInt(branchId);
    const serviceIdNum = parseInt(serviceId);

    const department = departments.find((d) => d.id === deptId);
    const state = states.find((s) => s.id === stateIdNum);
    const branch = branches.find((b) => b.id === branchIdNum);
    const service = services.find((s) => s.id === serviceIdNum);

    if (!department || !state || !branch || !service) {
      router.push("/");
      return;
    }

    setSelectedDepartment(deptId);
    setSelectedState(stateIdNum);
    setSelectedBranch(branchIdNum);
    setSelectedService(serviceIdNum);
  }, [searchParams, router]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleNext = () => {
    if (
      selectedDepartment &&
      selectedState &&
      selectedBranch &&
      selectedService &&
      selectedCategory
    ) {
      router.push(
        `/queue-status?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}&service=${selectedService}&category=${selectedCategory}`
      );
    }
  };

  const handleBack = () => {
    router.push(
      `/service-selection?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}`
    );
  };

  if (
    !selectedDepartment ||
    !selectedState ||
    !selectedBranch ||
    !selectedService
  )
    return null;

  const selectedDepartmentData = departments.find(
    (d) => d.id === selectedDepartment
  );
  const selectedStateData = states.find((s) => s.id === selectedState);
  const selectedBranchData = branches.find((b) => b.id === selectedBranch);
  const selectedServiceData = services.find((s) => s.id === selectedService);

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
    {
      label: "Pilih Servis",
      onClick: () =>
        router.push(
          `/service-selection?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}`
        ),
    },
    { label: "Pilih Kategori" },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <Header
        title="Pilih Kategori Pengguna"
        subtitle="Pilih kategori pengguna anda untuk giliran keutamaan"
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
          <p className="text-sm text-blue-800">
            <strong>Servis:</strong> {selectedServiceData?.name}
          </p>
        </div>

        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Maklumat:</strong> Kategori Khas adalah untuk warga emas,
            OKU, wanita hamil, dan kanak-kanak. Mereka akan mendapat giliran
            keutamaan yang lebih cepat.
          </p>
          <p className="text-sm text-yellow-800">
            <strong>Maklumat:</strong> Pengguna berbayar untuk keutamaan
            giliran. Bayaran akan digunakan untuk penambahan staf & sekaligus
            mengurangkan masa tunggu Umum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userCategories.map((category) => (
            <SelectionCard
              key={category.id}
              id={category.id.toString()}
              title={`${category.icon} ${category.name}`}
              subtitle={category.description}
              status={category.priority ? "Keutamaan" : "Umum"}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>
      </div>

      <ActionButtons
        onBack={handleBack}
        onNext={handleNext}
        backText="Kembali"
        nextText="Seterusnya: Ambil Nombor"
        disabled={!selectedCategory}
      />
    </PageContainer>
  );
};

const UserCategoryPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserCategoryContent />
    </Suspense>
  );
};

export default UserCategoryPage;
