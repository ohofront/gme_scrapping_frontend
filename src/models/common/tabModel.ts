import { ReactNode } from "react";
import { HistoricalViewModel } from "../view/viewModel";

export interface Tab {
  title: string;
  content: ReactNode;
}

export interface HistoryTab {
  title: string;
  value: string;
}