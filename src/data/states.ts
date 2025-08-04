export interface State {
  id: number;
  name: string;
  code: string;
}

export const states: State[] = [
  {
    id: 1,
    name: "Selangor",
    code: "SGR"
  },
  {
    id: 2,
    name: "Kuala Lumpur",
    code: "KL"
  },
  {
    id: 3,
    name: "Johor",
    code: "JHR"
  },
  {
    id: 4,
    name: "Penang",
    code: "PNG"
  },
  {
    id: 5,
    name: "Sabah",
    code: "SBH"
  },
  {
    id: 6,
    name: "Sarawak",
    code: "SRW"
  }
];

export const getStateById = (id: number): State | undefined => {
  return states.find(state => state.id === id);
};

export const getStateByName = (name: string): State | undefined => {
  return states.find(state => state.name === name);
};
