export interface Department {
  id: number;
  name: string;
  full_name: string;
  description: string;
  status: 'Open' | 'Closed' | 'Maintenance';
}

export const departments: Department[] = [
  {
    id: 1,
    name: "JPN",
    full_name: "Jabatan Pendaftaran Negara",
    description: "IC, Passport, and citizenship services",
    status: "Open"
  },
  {
    id: 2,
    name: "JPJ",
    full_name: "Jabatan Pengangkutan Jalan",
    description: "Driver's license and vehicle registration",
    status: "Open"
  },
  {
    id: 3,
    name: "JIM",
    full_name: "Jabatan Imigresen Malaysia",
    description: "Immigration and visa services",
    status: "Open"
  },
  {
    id: 4,
    name: "PDRM",
    full_name: "Polis Diraja Malaysia",
    description: "Police reports and certificates",
    status: "Open"
  }
];

export const getDepartmentById = (id: number): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

export const getDepartmentByName = (name: string): Department | undefined => {
  return departments.find(dept => dept.name === name);
};
