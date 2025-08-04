"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import SelectionCard from "@/components/Selection/SelectionCard";
import ActionButtons from "@/components/Layout/ActionButtons";

const departments = [
  {
    id: "jpn",
    title: "Jabatan Pendaftaran Negara (JPN)",
    subtitle: "IC, Passport, and citizenship services",
    status: "Open",
  },
  {
    id: "jpj",
    title: "Jabatan Pengangkutan Jalan (JPJ)",
    subtitle: "Driver's license and vehicle registration",
    status: "Open",
  },
  {
    id: "jim",
    title: "Jabatan Imigresen Malaysia (JIM)",
    subtitle: "Immigration and visa services",
    status: "Open",
  },
  {
    id: "pdrm",
    title: "Polis Diraja Malaysia (PDRM)",
    subtitle: "Police reports and certificates",
    status: "Open",
  },
];

const HomePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
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
              id={department.id}
              title={department.title}
              subtitle={department.subtitle}
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
