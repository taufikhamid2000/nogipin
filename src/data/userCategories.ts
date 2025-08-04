export interface UserCategory {
  id: number;
  name: string;
  description: string;
  priority: boolean;
  icon?: string;
}

export const userCategories: UserCategory[] = [
  {
    id: 1,
    name: "Umum",
    description: "Pengguna umum",
    priority: false,
    icon: "👤",
  },
  {
    id: 2,
    name: "Khas",
    description: "Warga emas, OKU, wanita hamil, kanak-kanak",
    priority: true,
    icon: "⭐",
  },
];

export const getUserCategoryById = (id: number): UserCategory | undefined => {
  return userCategories.find((category) => category.id === id);
};

export const getPriorityCategories = (): UserCategory[] => {
  return userCategories.filter((category) => category.priority);
};

export const getRegularCategories = (): UserCategory[] => {
  return userCategories.filter((category) => !category.priority);
};
