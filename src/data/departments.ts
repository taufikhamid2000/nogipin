export interface Department {
  id: number;
  name: string;
  full_name: string;
  description: string;
  status: "Buka" | "Tutup" | "Penyelenggaraan";
}

export const departments: Department[] = [
  {
    id: 1,
    name: "JPN",
    full_name: "Jabatan Pendaftaran Negara",
    description: "Perkhidmatan IC dan kerakyatan", // ✅ removed 'Pasport'
    status: "Buka",
  },
  {
    id: 2,
    name: "JPJ",
    full_name: "Jabatan Pengangkutan Jalan",
    description: "Lesen memandu dan pendaftaran kenderaan",
    status: "Buka",
  },
  {
    id: 3,
    name: "JIM",
    full_name: "Jabatan Imigresen Malaysia",
    description: "Perkhidmatan pasport, imigresen dan visa", // ✅ added 'pasport'
    status: "Buka",
  },
  {
    id: 4,
    name: "PDRM",
    full_name: "Polis Diraja Malaysia",
    description: "Laporan polis dan sijil",
    status: "Buka",
  },
];

export const getDepartmentById = (id: number): Department | undefined => {
  return departments.find((dept) => dept.id === id);
};

export const getDepartmentByName = (name: string): Department | undefined => {
  return departments.find((dept) => dept.name === name);
};
