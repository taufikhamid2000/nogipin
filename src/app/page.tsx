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

  const handleCheckQueue = () => {
    router.push("/direct-queue");
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
        nextText="Seterusnya: Pilih Negeri"
        disabled={!selectedDepartment}
      />

      {/* Subtle Check Queue Number Button below main flow */}
      <div className="px-8 pt-2 pb-6 text-center">
        <hr className="my-4" />
        <p className="text-sm text-gray-500 mb-2">Sudah ada nombor giliran?</p>
        <button
          onClick={handleCheckQueue}
          className="px-4 py-2 bg-gray-100 text-blue-700 rounded border border-gray-300 hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Periksa Nombor Giliran Anda
        </button>
      </div>

      <div className="px-8 pb-6 text-center">
        <p className="text-sm text-gray-500">
          Perlukan Bantuan?{" "}
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Klik di sini
          </Link>
          .
        </p>
      </div>
    </PageContainer>
  );
};

export default HomePage;
