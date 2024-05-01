import { ReactNode } from "react";
import { HistoricalViewModel } from "../view/viewModel";

export interface Tab {
  title: any;
  content: ReactNode;
}

export interface HistoryTab {
  title: string;
  value: string;
}
