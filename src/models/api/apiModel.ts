export type RemitMethodCode = "BDP01" | "BPM01" | "BDP01(USD)" | "BPM01(USD)";

export type Params = {
  startDttm: Date;
  remitMethodCode: RemitMethodCode;
  format: string;
  country: string;
  isHistory: string;
  period: string;
};

export type ResponseParams = {
  ScrapDTTM: string;
  SentNation: string;
  SentCurrency: string;
  SiteName: string;
  RemitMethod: string;
  RemitMethodCd: string;
  SentAmt: number;
  RecvAmt: number;
};
