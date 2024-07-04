export interface Competitor {
  id: number;
  company: string
  amount: number;
}

export interface View {
  id: number;
  country: string;
  changeunit: string;
  competitors: Competitor[];
}

export interface HistoricalViewCompetitor {
  id: number;
  amount: number;
  date: string;
}

export interface HistoricalViewModel {
  id: number;
  company: string;
  country: string;
  changeunit: string;
  competitors: HistoricalViewCompetitor[];
}