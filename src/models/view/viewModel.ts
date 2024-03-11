export interface View {
  id: number;
  country: string;
  competitors: Competitor[];
}

export interface ChangeUnit {
  amount: number;
  unit: string;
}
export interface Competitor {
  id: number;
  company: string;
  amount: number;
}
