export interface Branch {
  id: number;
  name: string;
  department_id: number;
  state_id: number; // Use IC-based code
  address: string;
  phone: string;
  operating_hours: string;
  status: "Buka" | "Tutup" | "Penyelenggaraan";
  current_queue: number;
  total_queue: number;
  estimated_wait_time: string;
  distance?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const branches: Branch[] = [
  // Selangor (state_id: 10)
  {
    id: 1,
    name: "JPN Shah Alam",
    department_id: 1,
    state_id: 10,
    address: "Jalan Setia Dagang, Seksyen 13, 40000 Shah Alam, Selangor",
    phone: "03-5519 0000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 15,
    total_queue: 45,
    estimated_wait_time: "45 minit",
    distance: "2.3 km dari tempat anda",
  },
  {
    id: 2,
    name: "JPJ Petaling Jaya",
    department_id: 2,
    state_id: 10,
    address: "Jalan 222, Seksyen 51A, 46100 Petaling Jaya, Selangor",
    phone: "03-7954 8000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 8,
    total_queue: 32,
    estimated_wait_time: "25 minit",
    distance: "5.1 km dari tempat anda",
  },
  {
    id: 3,
    name: "JIM Klang",
    department_id: 3,
    state_id: 10,
    address: "Jalan Meru, 41050 Klang, Selangor",
    phone: "03-3341 2000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 12,
    total_queue: 38,
    estimated_wait_time: "35 minit",
    distance: "8.7 km dari tempat anda",
  },
  {
    id: 4,
    name: "PDRM Kajang",
    department_id: 4,
    state_id: 10,
    address: "Jalan Reko, 43000 Kajang, Selangor",
    phone: "03-8736 6000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 4,
    total_queue: 15,
    estimated_wait_time: "15 minit",
    distance: "12.3 km dari tempat anda",
  },

  // Kuala Lumpur (state_id: 14)
  {
    id: 5,
    name: "JPN Kuala Lumpur",
    department_id: 1,
    state_id: 14,
    address: "Jalan Duta, 50480 Kuala Lumpur",
    phone: "03-6201 7000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 1010518,
    total_queue: 8,
    estimated_wait_time: "40 minit",
    distance: "1.2 km dari tempat anda",
  },
  {
    id: 6,
    name: "JPJ Kuala Lumpur",
    department_id: 2,
    state_id: 14,
    address: "Jalan Tun Razak, 50400 Kuala Lumpur",
    phone: "03-2691 2000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 18,
    total_queue: 52,
    estimated_wait_time: "60 minit",
    distance: "3.8 km dari tempat anda",
  },
  {
    id: 7,
    name: "JIM Kuala Lumpur",
    department_id: 3,
    state_id: 14,
    address: "Jalan Bukit Aman, 50560 Kuala Lumpur",
    phone: "03-2262 6000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 22,
    total_queue: 65,
    estimated_wait_time: "75 minit",
    distance: "2.1 km dari tempat anda",
  },

  // Johor (state_id: 01)
  {
    id: 8,
    name: "JPN Johor Bahru",
    department_id: 1,
    state_id: 1,
    address: "Jalan Dato' Onn, 80000 Johor Bahru, Johor",
    phone: "07-224 1000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 12,
    total_queue: 35,
    estimated_wait_time: "40 minit",
    distance: "0.8 km dari tempat anda",
  },
  {
    id: 9,
    name: "JPJ Johor Bahru",
    department_id: 2,
    state_id: 1,
    address: "Jalan Tebrau, 80000 Johor Bahru, Johor",
    phone: "07-235 2000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 9,
    total_queue: 28,
    estimated_wait_time: "30 minit",
    distance: "2.5 km dari tempat anda",
  },

  // Penang (state_id: 07)
  {
    id: 10,
    name: "JPN George Town",
    department_id: 1,
    state_id: 7,
    address: "Jalan Macalister, 10400 George Town, Pulau Pinang",
    phone: "04-261 1000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 16,
    total_queue: 42,
    estimated_wait_time: "50 minit",
    distance: "1.5 km dari tempat anda",
  },
  {
    id: 11,
    name: "JPJ Butterworth",
    department_id: 2,
    state_id: 7,
    address: "Jalan Bagan Luar, 12000 Butterworth, Pulau Pinang",
    phone: "04-331 2000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 7,
    total_queue: 23,
    estimated_wait_time: "25 minit",
    distance: "4.2 km dari tempat anda",
  },

  // Sabah (state_id: 12)
  {
    id: 12,
    name: "JPN Kota Kinabalu",
    department_id: 1,
    state_id: 12,
    address: "Jalan Tun Razak, 88000 Kota Kinabalu, Sabah",
    phone: "088-488 000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 11,
    total_queue: 31,
    estimated_wait_time: "35 minit",
    distance: "0.9 km dari tempat anda",
  },

  // Sarawak (state_id: 13)
  {
    id: 13,
    name: "JPN Kuching",
    department_id: 1,
    state_id: 13,
    address: "Jalan Simpang Tiga, 93000 Kuching, Sarawak",
    phone: "082-244 000",
    operating_hours: "8:00 pagi - 5:00 petang",
    status: "Buka",
    current_queue: 8,
    total_queue: 25,
    estimated_wait_time: "30 minit",
    distance: "1.3 km dari tempat anda",
  },
];

export const getBranchById = (id: number): Branch | undefined => {
  return branches.find((branch) => branch.id === id);
};

export const getBranchesByDepartment = (departmentId: number): Branch[] => {
  return branches.filter((branch) => branch.department_id === departmentId);
};

export const getBranchesByState = (stateId: number): Branch[] => {
  return branches.filter((branch) => branch.state_id === stateId);
};

export const getBranchesByDepartmentAndState = (
  departmentId: number,
  stateId: number
): Branch[] => {
  return branches.filter(
    (branch) =>
      branch.department_id === departmentId && branch.state_id === stateId
  );
};
