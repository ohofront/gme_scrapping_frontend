export interface Info {
  id: number;
  company: string
  amount: number;
}
export interface Competitor {
  changeunit: string;
  info: Info[];
}

export interface View {
  id: number;
  country: string;
  competitors: Competitor[];
}

export interface HistoricalViewCompetitor {
  id: number;
  country: string;
  amount: number;
  date: string;
}

export interface HistoricalViewModel {
  id: number;
  company: string;
  competitors: HistoricalViewCompetitor[];
}