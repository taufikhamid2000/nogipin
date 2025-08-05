"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import PageContainer from "@/components/Layout/PageContainer";
import Header from "@/components/Layout/Header";
import Breadcrumb from "@/components/Layout/Breadcrumb";
import ActionButtons from "@/components/Layout/ActionButtons";
import { departments } from "@/data/departments";
import { states } from "@/data/states";
import { branches } from "@/data/branches";
import { services } from "@/data/services";
import { userCategories } from "@/data/userCategories";

interface QueueTicket {
  queueNumber: string;
  estimatedWaitTime: string;
  estimatedArrivalTime: string;
  priority: boolean;
  timestamp: Date;
  ticketData: {
    department: string;
    state: string;
    branch: string;
    service: string;
    category: string;
    queueNumber: string;
    estimatedWaitTime: string;
    estimatedArrivalTime: string;
    timestamp: string;
    checkUrl: string;
  };
}

const QueueStatusContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [queueTicket, setQueueTicket] = useState<QueueTicket | null>(null);
  const [step, setStep] = useState<"confirm" | "ticket" | "complete">(
    "confirm"
  );

  useEffect(() => {
    const departmentId = searchParams.get("department");
    const stateId = searchParams.get("state");
    const branchId = searchParams.get("branch");
    const serviceId = searchParams.get("service");
    const categoryId = searchParams.get("category");

    if (!departmentId || !stateId || !branchId || !serviceId || !categoryId) {
      router.push("/");
      return;
    }

    const deptId = parseInt(departmentId);
    const stateIdNum = parseInt(stateId);
    const branchIdNum = parseInt(branchId);
    const serviceIdNum = parseInt(serviceId);
    const categoryIdNum = parseInt(categoryId);

    const department = departments.find((d) => d.id === deptId);
    const state = states.find((s) => s.id === stateIdNum);
    const branch = branches.find((b) => b.id === branchIdNum);
    const service = services.find((s) => s.id === serviceIdNum);
    const category = userCategories.find((c) => c.id === categoryIdNum);

    if (!department || !state || !branch || !service || !category) {
      router.push("/");
      return;
    }

    setSelectedDepartment(deptId);
    setSelectedState(stateIdNum);
    setSelectedBranch(branchIdNum);
    setSelectedService(serviceIdNum);
    setSelectedCategory(categoryIdNum);
  }, [searchParams, router]);

  const generateQueueNumber = () => {
    const branch = branches.find((b) => b.id === selectedBranch);
    const service = services.find((s) => s.id === selectedService);
    const category = userCategories.find((c) => c.id === selectedCategory);

    if (!branch || !service || !category) return;

    // Generate queue number based on branch and current queue
    const currentQueue = branch.current_queue;
    const newQueueNumber = currentQueue + 1;
    const queuePrefix = category.priority ? "P" : "R"; // Priority or Regular based on user category
    const formattedNumber = `${queuePrefix}${branch.id
      .toString()
      .padStart(2, "0")}${newQueueNumber.toString().padStart(3, "0")}`;

    // Calculate estimated wait time (priority users get faster service)
    const baseWaitTime = Math.ceil(branch.total_queue * 5); // 5 minutes per person
    const estimatedMinutes = category.priority
      ? Math.ceil(baseWaitTime * 0.5)
      : baseWaitTime; // Priority users get 50% faster service
    const estimatedArrival = new Date();
    estimatedArrival.setMinutes(
      estimatedArrival.getMinutes() + estimatedMinutes
    );

    const ticket: QueueTicket = {
      queueNumber: formattedNumber,
      estimatedWaitTime: `${estimatedMinutes} minutes`,
      estimatedArrivalTime: estimatedArrival.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      priority: category.priority,
      timestamp: new Date(),
      ticketData: {
        department: selectedDepartmentData?.full_name || "",
        state: selectedStateData?.name || "",
        branch: branch.name,
        service: service.name,
        category: category.name,
        queueNumber: formattedNumber,
        estimatedWaitTime: `${estimatedMinutes} minutes`,
        estimatedArrivalTime: estimatedArrival.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        timestamp: new Date().toISOString(),
        checkUrl: `${window.location.origin}/queue-status?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}&service=${selectedService}&category=${selectedCategory}`,
      },
    };

    setQueueTicket(ticket);
    setStep("ticket");
  };

  const handleCancel = () => {
    if (confirm("Adakah anda pasti mahu membatalkan nombor giliran ini?")) {
      router.push("/");
    }
  };

  const handleBack = () => {
    router.push(
      `/user-category?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}&service=${selectedService}`
    );
  };

  const downloadTicket = () => {
    if (!queueTicket) return;

    // Create PDF
    const pdf = new jsPDF();

    // Add header
    pdf.setFontSize(20);
    pdf.setTextColor(34, 139, 34); // Green color
    pdf.text("Nombor Giliran", 105, 20, { align: "center" });

    // Add queue number
    pdf.setFontSize(32);
    pdf.setTextColor(0, 0, 0);
    pdf.text(queueTicket.queueNumber, 105, 40, { align: "center" });

    // Add priority badge if applicable
    if (queueTicket.priority) {
      pdf.setFontSize(12);
      pdf.setTextColor(255, 140, 0); // Orange color
      pdf.text("⭐ Giliran Khas - Keutamaan", 105, 55, { align: "center" });
    }

    // Add ticket details
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);

    let yPosition = 80;
    const lineHeight = 8;

    pdf.text(`Jabatan: ${queueTicket.ticketData.department}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Negeri: ${queueTicket.ticketData.state}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Lokasi: ${queueTicket.ticketData.branch}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Servis: ${queueTicket.ticketData.service}`, 20, yPosition);
    yPosition += lineHeight;
    pdf.text(`Kategori: ${queueTicket.ticketData.category}`, 20, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(
      `Anggaran Masa Tunggu: ${queueTicket.ticketData.estimatedWaitTime}`,
      20,
      yPosition
    );
    yPosition += lineHeight;
    pdf.text(
      `Anggaran Masa Tiba: ${queueTicket.ticketData.estimatedArrivalTime}`,
      20,
      yPosition
    );
    yPosition += lineHeight;
    pdf.text(
      `Masa Ambil Nombor: ${new Date(
        queueTicket.ticketData.timestamp
      ).toLocaleString("ms-MY")}`,
      20,
      yPosition
    );
    yPosition += lineHeight * 2;

    // Add QR code instructions
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Imbas QR code untuk semak status giliran", 20, yPosition);
    yPosition += lineHeight;
    pdf.text("atau lawati:", 20, yPosition);
    yPosition += lineHeight;
    pdf.text(queueTicket.ticketData.checkUrl, 20, yPosition);

    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text("Dicetak pada: " + new Date().toLocaleString("ms-MY"), 20, 280);

    // Save PDF
    pdf.save(`queue-ticket-${queueTicket.queueNumber}.pdf`);
  };

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;

    // Convert QR code to canvas and download
    const canvas = qrCodeRef.current.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-ticket-${queueTicket?.queueNumber}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (
    !selectedDepartment ||
    !selectedState ||
    !selectedBranch ||
    !selectedService ||
    !selectedCategory
  )
    return null;

  const selectedDepartmentData = departments.find(
    (d) => d.id === selectedDepartment
  );
  const selectedStateData = states.find((s) => s.id === selectedState);
  const selectedBranchData = branches.find((b) => b.id === selectedBranch);
  const selectedServiceData = services.find((s) => s.id === selectedService);
  const selectedCategoryData = userCategories.find(
    (c) => c.id === selectedCategory
  );

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
    {
      label: "Pilih Kategori",
      onClick: () =>
        router.push(
          `/user-category?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}&service=${selectedService}`
        ),
    },
    { label: "Ambil Nombor" },
  ];

  return (
    <PageContainer>
      <Breadcrumb items={breadcrumbItems} />

      <Header
        title="Ambil Nombor Giliran"
        subtitle="Sahkan maklumat dan ambil nombor giliran anda"
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
          <p className="text-sm text-blue-800">
            <strong>Kategori:</strong> {selectedCategoryData?.icon}{" "}
            {selectedCategoryData?.name}
          </p>
        </div>

        {step === "confirm" && (
          <div className="text-center">
            <div className="mb-6 p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Maklumat Giliran
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Lokasi:</strong> {selectedBranchData?.name}
                </p>
                <p>
                  <strong>Alamat:</strong> {selectedBranchData?.address}
                </p>
                <p>
                  <strong>Waktu Operasi:</strong>{" "}
                  {selectedBranchData?.operating_hours}
                </p>
                <p>
                  <strong>Nombor Telefon:</strong> {selectedBranchData?.phone}
                </p>
                <p>
                  <strong>Giliran Semasa:</strong>{" "}
                  {selectedBranchData?.current_queue}
                </p>
                <p>
                  <strong>Jumlah dalam Giliran:</strong>{" "}
                  {selectedBranchData?.total_queue}
                </p>
                <p>
                  <strong>Anggaran Masa Tunggu:</strong>{" "}
                  {selectedBranchData?.estimated_wait_time}
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={generateQueueNumber}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Ambil Nombor Giliran
              </button>
            </div>
          </div>
        )}

        {step === "ticket" && queueTicket && (
          <div className="text-center">
            <div className="mb-6 p-8 bg-white rounded-lg border-2 border-green-200 shadow-lg">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Nombor Giliran Anda
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  {queueTicket.queueNumber}
                </div>
                {queueTicket.priority && (
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {selectedCategoryData?.icon} Giliran Khas - Keutamaan
                  </span>
                )}
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Anggaran Masa Tunggu:</strong>{" "}
                  {queueTicket.estimatedWaitTime}
                </p>
                <p>
                  <strong>Anggaran Masa Tiba:</strong>{" "}
                  {queueTicket.estimatedArrivalTime}
                </p>
                <p>
                  <strong>Masa Ambil Nombor:</strong>{" "}
                  {queueTicket.timestamp.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              {/* QR Code Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  📱 Simpan nombor giliran Anda
                </h4>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    ref={qrCodeRef}
                    className="p-4 bg-white rounded-lg border"
                  >
                    <QRCodeCanvas
                      value={JSON.stringify({
                        ...queueTicket.ticketData,
                        checkUrl: `${window.location.origin}/queue-status?department=${selectedDepartment}&state=${selectedState}&branch=${selectedBranch}&service=${selectedService}&category=${selectedCategory}`,
                      })}
                      size={120}
                      level="M"
                      includeMargin={true}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={downloadQRCode}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      📱 Muat Turun Kod QR
                    </button>
                    <button
                      onClick={downloadTicket}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      📄 Muat Turun PDF
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center max-w-xs">
                    Imbas Kod QR atau muat turun PDF untuk simpan maklumat
                    giliran anda
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Peringatan:</strong> Sila datang ke lokasi 10 minit
                sebelum nombor anda dipanggil.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Batalkan Nombor
              </button>
            </div>
          </div>
        )}
      </div>

      <ActionButtons onBack={handleBack} backText="Back" />
    </PageContainer>
  );
};

const QueueStatusPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueueStatusContent />
    </Suspense>
  );
};

export default QueueStatusPage;
