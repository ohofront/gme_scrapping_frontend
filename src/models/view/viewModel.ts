export interface View {
  id: number;
  country: string;
  competitors: Competitor[];
}

export interface Competitor {
  id: number;
  company: string;
  amount: number;
}
