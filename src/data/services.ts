export interface Service {
  id: number;
  name: string;
  description: string;
  estimated_time: string;
  priority: boolean;
  department_id: number;
}

export const services: Service[] = [
  // JPN Services (department_id: 1)
  {
    id: 1,
    name: "Pembaharuan IC",
    description: "Perbaharui Kad Pengenalan Malaysia anda",
    estimated_time: "30-45 minit",
    priority: false,
    department_id: 1,
  },
  {
    id: 2,
    name: "Penggantian IC",
    description: "Ganti IC yang hilang atau rosak",
    estimated_time: "45-60 minit",
    priority: false,
    department_id: 1,
  },
  {
    id: 5,
    name: "Perkhidmatan Kerakyatan",
    description: "Permohonan kerakyatan dan sijil",
    estimated_time: "90-120 minit",
    priority: false,
    department_id: 1,
  },

  // JPJ Services (department_id: 2)
  {
    id: 6,
    name: "Pembaharuan Lesen",
    description: "Perbaharui lesen memandu anda",
    estimated_time: "30-45 minit",
    priority: false,
    department_id: 2,
  },
  {
    id: 7,
    name: "Permohonan Lesen Baru",
    description: "Mohon lesen memandu baru",
    estimated_time: "60-90 minit",
    priority: false,
    department_id: 2,
  },
  {
    id: 8,
    name: "Pendaftaran Kenderaan",
    description: "Daftar kenderaan baru",
    estimated_time: "45-60 minit",
    priority: false,
    department_id: 2,
  },
  {
    id: 9,
    name: "Pemindahan Kenderaan",
    description: "Pindah milik kenderaan",
    estimated_time: "60-90 minit",
    priority: false,
    department_id: 2,
  },
  {
    id: 10,
    name: "Bayaran Saman",
    description: "Bayar saman trafik",
    estimated_time: "15-30 minit",
    priority: false,
    department_id: 2,
  },

  // JIM Services (department_id: 3)
  {
    id: 3,
    name: "Permohonan Pasport",
    description: "Mohon pasport baru",
    estimated_time: "60-90 minit",
    priority: false,
    department_id: 3,
  },
  {
    id: 4,
    name: "Pembaharuan Pasport",
    description: "Perbaharui pasport sedia ada",
    estimated_time: "45-60 minit",
    priority: false,
    department_id: 3,
  },
  {
    id: 11,
    name: "Permohonan Visa",
    description: "Mohon visa kemasukan",
    estimated_time: "60-90 minit",
    priority: false,
    department_id: 3,
  },
  {
    id: 12,
    name: "Pembaharuan Visa",
    description: "Perbaharui visa sedia ada",
    estimated_time: "45-60 minit",
    priority: false,
    department_id: 3,
  },
  {
    id: 13,
    name: "Permit Kerja",
    description: "Mohon permit kerja",
    estimated_time: "90-120 minit",
    priority: false,
    department_id: 3,
  },
  {
    id: 14,
    name: "Cop Pasport",
    description: "Dapatkan cop pasport",
    estimated_time: "30-45 minit",
    priority: false,
    department_id: 3,
  },

  // PDRM Services (department_id: 4)
  {
    id: 15,
    name: "Laporan Polis",
    description: "Buat laporan polis",
    estimated_time: "30-45 minit",
    priority: false,
    department_id: 4,
  },
  {
    id: 16,
    name: "Sijil Kelakuan Baik",
    description: "Mohon sijil kelakuan baik",
    estimated_time: "45-60 minit",
    priority: false,
    department_id: 4,
  },
  {
    id: 17,
    name: "Kutipan Sijil",
    description: "Kutip sijil yang telah siap",
    estimated_time: "15-30 minit",
    priority: false,
    department_id: 4,
  },
  {
    id: 18,
    name: "Perkhidmatan Cap Jari",
    description: "Perkhidmatan pengesahan cap jari",
    estimated_time: "30-45 minit",
    priority: false,
    department_id: 4,
  },
];

export const getServiceById = (id: number): Service | undefined => {
  return services.find((service) => service.id === id);
};

export const getServicesByDepartment = (departmentId: number): Service[] => {
  return services.filter((service) => service.department_id === departmentId);
};

export const getPriorityServices = (): Service[] => {
  return services.filter((service) => service.priority);
};
