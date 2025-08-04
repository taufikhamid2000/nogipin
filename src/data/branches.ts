export interface Branch {
  id: number;
  name: string;
  department_id: number;
  state_id: number;
  address: string;
  phone: string;
  operating_hours: string;
  status: 'Open' | 'Closed' | 'Maintenance';
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
  // Selangor Branches (state_id: 1)
  {
    id: 1,
    name: "JPN Shah Alam",
    department_id: 1,
    state_id: 1,
    address: "Jalan Setia Dagang, Seksyen 13, 40000 Shah Alam, Selangor",
    phone: "03-5519 0000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 15,
    total_queue: 45,
    estimated_wait_time: "45 minutes",
    distance: "2.3 km away"
  },
  {
    id: 2,
    name: "JPJ Petaling Jaya",
    department_id: 2,
    state_id: 1,
    address: "Jalan 222, Seksyen 51A, 46100 Petaling Jaya, Selangor",
    phone: "03-7954 8000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 8,
    total_queue: 32,
    estimated_wait_time: "25 minutes",
    distance: "5.1 km away"
  },
  {
    id: 3,
    name: "JIM Klang",
    department_id: 3,
    state_id: 1,
    address: "Jalan Meru, 41050 Klang, Selangor",
    phone: "03-3341 2000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 12,
    total_queue: 38,
    estimated_wait_time: "35 minutes",
    distance: "8.7 km away"
  },
  {
    id: 4,
    name: "PDRM Kajang",
    department_id: 4,
    state_id: 1,
    address: "Jalan Reko, 43000 Kajang, Selangor",
    phone: "03-8736 6000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 4,
    total_queue: 15,
    estimated_wait_time: "15 minutes",
    distance: "12.3 km away"
  },

  // Kuala Lumpur Branches (state_id: 2)
  {
    id: 5,
    name: "JPN Kuala Lumpur",
    department_id: 1,
    state_id: 2,
    address: "Jalan Duta, 50480 Kuala Lumpur",
    phone: "03-6201 7000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 25,
    total_queue: 78,
    estimated_wait_time: "90 minutes",
    distance: "1.2 km away"
  },
  {
    id: 6,
    name: "JPJ Kuala Lumpur",
    department_id: 2,
    state_id: 2,
    address: "Jalan Tun Razak, 50400 Kuala Lumpur",
    phone: "03-2691 2000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 18,
    total_queue: 52,
    estimated_wait_time: "60 minutes",
    distance: "3.8 km away"
  },
  {
    id: 7,
    name: "JIM Kuala Lumpur",
    department_id: 3,
    state_id: 2,
    address: "Jalan Bukit Aman, 50560 Kuala Lumpur",
    phone: "03-2262 6000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 22,
    total_queue: 65,
    estimated_wait_time: "75 minutes",
    distance: "2.1 km away"
  },

  // Johor Branches (state_id: 3)
  {
    id: 8,
    name: "JPN Johor Bahru",
    department_id: 1,
    state_id: 3,
    address: "Jalan Dato' Onn, 80000 Johor Bahru, Johor",
    phone: "07-224 1000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 12,
    total_queue: 35,
    estimated_wait_time: "40 minutes",
    distance: "0.8 km away"
  },
  {
    id: 9,
    name: "JPJ Johor Bahru",
    department_id: 2,
    state_id: 3,
    address: "Jalan Tebrau, 80000 Johor Bahru, Johor",
    phone: "07-235 2000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 9,
    total_queue: 28,
    estimated_wait_time: "30 minutes",
    distance: "2.5 km away"
  },

  // Penang Branches (state_id: 4)
  {
    id: 10,
    name: "JPN George Town",
    department_id: 1,
    state_id: 4,
    address: "Jalan Macalister, 10400 George Town, Penang",
    phone: "04-261 1000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 16,
    total_queue: 42,
    estimated_wait_time: "50 minutes",
    distance: "1.5 km away"
  },
  {
    id: 11,
    name: "JPJ Butterworth",
    department_id: 2,
    state_id: 4,
    address: "Jalan Bagan Luar, 12000 Butterworth, Penang",
    phone: "04-331 2000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 7,
    total_queue: 23,
    estimated_wait_time: "25 minutes",
    distance: "4.2 km away"
  },

  // Sabah Branches (state_id: 5)
  {
    id: 12,
    name: "JPN Kota Kinabalu",
    department_id: 1,
    state_id: 5,
    address: "Jalan Tun Razak, 88000 Kota Kinabalu, Sabah",
    phone: "088-488 000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 11,
    total_queue: 31,
    estimated_wait_time: "35 minutes",
    distance: "0.9 km away"
  },

  // Sarawak Branches (state_id: 6)
  {
    id: 13,
    name: "JPN Kuching",
    department_id: 1,
    state_id: 6,
    address: "Jalan Simpang Tiga, 93000 Kuching, Sarawak",
    phone: "082-244 000",
    operating_hours: "8:00 AM - 5:00 PM",
    status: "Open",
    current_queue: 8,
    total_queue: 25,
    estimated_wait_time: "30 minutes",
    distance: "1.3 km away"
  }
];

export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

export const getBranchesByDepartment = (departmentId: number): Branch[] => {
  return branches.filter(branch => branch.department_id === departmentId);
};

export const getBranchesByState = (stateId: number): Branch[] => {
  return branches.filter(branch => branch.state_id === stateId);
};

export const getBranchesByDepartmentAndState = (departmentId: number, stateId: number): Branch[] => {
  return branches.filter(branch => 
    branch.department_id === departmentId && branch.state_id === stateId
  );
}; 