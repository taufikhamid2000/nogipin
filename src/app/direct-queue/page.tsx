"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import DarkModeToggle from "@/components/Layout/DarkModeToggle";
import { departments } from "@/data/departments";
import { services } from "@/data/services";
import { branches } from "@/data/branches";

function decodeQueueNumber(queueNumber: string) {
  if (queueNumber.length !== 8 || !/^\d{8}$/.test(queueNumber)) return null;
  return {
    department: parseInt(queueNumber.substring(0, 2)),
    service: parseInt(queueNumber.substring(2, 4)),
    branch: parseInt(queueNumber.substring(4, 6)),
    queue: queueNumber.substring(6, 8),
  };
}

function DirectQueueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [queueNumber, setQueueNumber] = useState("");
  const [decoded, setDecoded] = useState<null | {
    department: number;
    service: number;
    branch: number;
    queue: string;
  }>(null);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const queueNumberFromUrl = searchParams.get("queueNumber");
    if (queueNumberFromUrl) {
      setQueueNumber(queueNumberFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDecoded(null);
    if (!queueNumber.trim()) {
      setError("Sila masukkan nombor giliran anda.");
      return;
    }
    if (queueNumber.length !== 8 || !/^\d{8}$/.test(queueNumber)) {
      setError("Nombor giliran mestilah 8 digit nombor. Contoh: 01020305");
      return;
    }
    const decodedInfo = decodeQueueNumber(queueNumber);
    if (!decodedInfo) {
      setError("Format nombor tidak sah.");
      return;
    }

    // Validate if the queue number exists in our data
    const dept = departments.find((d) => d.id === decodedInfo.department);
    const svc = services.find(
      (s) =>
        s.id === decodedInfo.service &&
        s.department_id === decodedInfo.department
    );
    const br = branches.find(
      (b) =>
        b.id === decodedInfo.branch &&
        b.department_id === decodedInfo.department
    );

    if (!dept || !svc || !br) {
      setError("Nombor giliran tidak wujud. Sila semak nombor anda.");
      return;
    }

    setDecoded(decodedInfo);
  };

  const handleReset = () => {
    setDecoded(null);
    setQueueNumber("");
    setError("");
  };

  const handleRefresh = () => {
    if (!decoded) return;
    setIsRefreshing(true);
    // Simulate API call for real-time data
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  // Lookup names if decoded (we know these exist due to validation)
  let departmentName = "";
  let serviceName = "";
  let branchName = "";
  let currentQueue = 0;
  let totalQueue = 0;
  let estimatedWaitTime = "";
  if (decoded) {
    const dept = departments.find((d) => d.id === decoded.department)!;
    const svc = services.find(
      (s) => s.id === decoded.service && s.department_id === decoded.department
    )!;
    const br = branches.find(
      (b) => b.id === decoded.branch && b.department_id === decoded.department
    )!;

    departmentName = dept.full_name;
    serviceName = svc.name;
    branchName = br.name;
    currentQueue = br.current_queue;
    totalQueue = br.total_queue;
    estimatedWaitTime = br.estimated_wait_time;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 relative">
      {/* Dark Mode Toggle */}

      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 relative">
        <div className="flex justify-center mb-4">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={128}
            height={128}
            className="rounded-md"
          />
        </div>
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700 dark:text-purple-400">
          Giliran Secara Langsung
        </h1>
        {decoded ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">
                {queueNumber}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Nombor Giliran Anda
              </div>
              <div className="flex flex-col items-center text-sm mt-2">
                <div className="text-gray-700 dark:text-gray-300">
                  <strong>Jabatan:</strong> {departmentName}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <strong>Servis:</strong> {serviceName}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <strong>Lokasi:</strong> {branchName}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <strong>Giliran:</strong> {decoded.queue}
                </div>
              </div>
            </div>

            {/* Current Queue Status */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  Status Giliran
                </h3>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded text-sm hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
                >
                  {isRefreshing ? "⏳" : "🔄"} Segar Semula
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Nombor Sekarang:
                  </span>
                  <span className="font-semibold text-blue-700 dark:text-blue-400">
                    {currentQueue}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Jumlah dalam Giliran:
                  </span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {totalQueue}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Anggaran Masa Tunggu:
                  </span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {estimatedWaitTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={handleReset}
                className="w-full bg-purple-600 dark:bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors font-semibold"
              >
                Semak Nombor Lain
              </button>
              <button
                onClick={handleGoHome}
                className="w-full bg-gray-600 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold"
              >
                🏠 Kembali ke Laman Utama
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombor Giliran
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  value={queueNumber}
                  onChange={(e) => setQueueNumber(e.target.value)}
                  placeholder="Contoh: 01020305 (8 digit)"
                  maxLength={8}
                />
              </div>
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-purple-600 dark:bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors font-semibold"
              >
                Semak Status
              </button>
            </form>
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-600 dark:bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              🏠 Kembali ke Laman Utama
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DirectQueuePage() {
  return (
    <Suspense>
      <DirectQueueContent />
    </Suspense>
  );
}
