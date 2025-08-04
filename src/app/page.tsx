"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import SelectionCard from "@/components/Selection/SelectionCard";
import ActionButtons from "@/components/Layout/ActionButtons";
import { departments } from "@/data/departments";

const HomePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const router = useRouter();

  const handleNext = () => {
    if (selectedDepartment) {
      router.push(`/state-selection?department=${selectedDepartment}`);
    }
  };

  return (
    <PageContainer>
      <Header
        title="MyBeratur"
        subtitle="Sistem Beratur Digital Malaysia - Pilih Jabatan"
      />

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((department) => (
            <SelectionCard
              key={department.id}
              id={department.id.toString()}
              title={`${department.full_name} (${department.name})`}
              subtitle={department.description}
              status={department.status}
              isSelected={selectedDepartment === department.id}
              onClick={() => setSelectedDepartment(department.id)}
            />
          ))}
        </div>
      </div>

      <ActionButtons
        onNext={handleNext}
        nextText="Next: Pilih Negeri"
        disabled={!selectedDepartment}
      />

      <div className="px-8 pb-6 text-center">
        <p className="text-sm text-gray-500">
          Need help? Visit our{" "}
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            About page
          </Link>
          .
        </p>
      </div>
    </PageContainer>
  );
};

export default HomePage;
