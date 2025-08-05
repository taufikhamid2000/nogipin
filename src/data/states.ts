export interface State {
  id: number;
  name: string;
  code: string; // IC code
}

export const states: State[] = [
  { id: 1, name: "Johor", code: "01" },
  { id: 2, name: "Kedah", code: "02" },
  { id: 3, name: "Kelantan", code: "03" },
  { id: 4, name: "Melaka", code: "04" },
  { id: 5, name: "Negeri Sembilan", code: "05" },
  { id: 6, name: "Pahang", code: "06" },
  { id: 7, name: "Penang", code: "07" },
  { id: 8, name: "Perak", code: "08" },
  { id: 9, name: "Perlis", code: "09" },
  { id: 10, name: "Selangor", code: "10" },
  { id: 11, name: "Terengganu", code: "11" },
  { id: 12, name: "Sabah", code: "12" },
  { id: 13, name: "Sarawak", code: "13" },
  { id: 14, name: "Wilayah Persekutuan Kuala Lumpur", code: "14" },
  { id: 15, name: "Wilayah Persekutuan Labuan", code: "15" },
  { id: 16, name: "Wilayah Persekutuan Putrajaya", code: "16" },
];

export const getStateById = (id: number): State | undefined => {
  return states.find((state) => state.id === id);
};

export const getStateByName = (name: string): State | undefined => {
  return states.find((state) => state.name === name);
};
