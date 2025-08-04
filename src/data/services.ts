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
    name: "IC Renewal",
    description: "Renew your Malaysian Identity Card",
    estimated_time: "30-45 minutes",
    priority: false,
    department_id: 1,
  },
  {
    id: 2,
    name: "IC Replacement",
    description: "Replace lost or damaged IC",
    estimated_time: "45-60 minutes",
    priority: false,
    department_id: 1,
  },
  {
    id: 3,
    name: "Passport Application",
    description: "Apply for new passport",
    estimated_time: "60-90 minutes",
    priority: false,
    department_id: 1,
  },
  {
    id: 4,
    name: "Passport Renewal",
    description: "Renew existing passport",
    estimated_time: "45-60 minutes",
    priority: false,
    department_id: 1,
  },
  {
    id: 5,
    name: "Citizenship Services",
    description: "Citizenship applications and certificates",
    estimated_time: "90-120 minutes",
    priority: false,
    department_id: 1,
  },

  // JPJ Services (department_id: 2)
  {
    id: 6,
    name: "License Renewal",
    description: "Renew your driver's license",
    estimated_time: "30-45 minutes",
    priority: false,
    department_id: 2,
  },
  {
    id: 7,
    name: "New License Application",
    description: "Apply for new driver's license",
    estimated_time: "60-90 minutes",
    priority: false,
    department_id: 2,
  },
  {
    id: 8,
    name: "Vehicle Registration",
    description: "Register new vehicle",
    estimated_time: "45-60 minutes",
    priority: false,
    department_id: 2,
  },
  {
    id: 9,
    name: "Vehicle Transfer",
    description: "Transfer vehicle ownership",
    estimated_time: "60-90 minutes",
    priority: false,
    department_id: 2,
  },
  {
    id: 10,
    name: "Summon Payment",
    description: "Pay traffic summons",
    estimated_time: "15-30 minutes",
    priority: false,
    department_id: 2,
  },

  // JIM Services (department_id: 3)
  {
    id: 11,
    name: "Visa Application",
    description: "Apply for entry visa",
    estimated_time: "60-90 minutes",
    priority: false,
    department_id: 3,
  },
  {
    id: 12,
    name: "Visa Renewal",
    description: "Renew existing visa",
    estimated_time: "45-60 minutes",
    priority: false,
    department_id: 3,
  },
  {
    id: 13,
    name: "Work Permit",
    description: "Apply for work permit",
    estimated_time: "90-120 minutes",
    priority: false,
    department_id: 3,
  },
  {
    id: 14,
    name: "Passport Stamping",
    description: "Get passport stamped",
    estimated_time: "30-45 minutes",
    priority: false,
    department_id: 3,
  },

  // PDRM Services (department_id: 4)
  {
    id: 15,
    name: "Police Report",
    description: "Make a police report",
    estimated_time: "30-45 minutes",
    priority: false,
    department_id: 4,
  },
  {
    id: 16,
    name: "Good Conduct Certificate",
    description: "Apply for good conduct certificate",
    estimated_time: "45-60 minutes",
    priority: false,
    department_id: 4,
  },
  {
    id: 17,
    name: "Certificate Collection",
    description: "Collect completed certificates",
    estimated_time: "15-30 minutes",
    priority: false,
    department_id: 4,
  },
  {
    id: 18,
    name: "Fingerprint Services",
    description: "Fingerprint verification services",
    estimated_time: "30-45 minutes",
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
