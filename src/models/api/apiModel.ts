export type RemitMethodCode = "BDP01" | "BPM01" | "BDP01(USD)" | "BPM01(USD)";

export type Params = {
  startDttm: string;
  endDttm: string;
  remitMethodCode: RemitMethodCode;
  format: string;
};

export type Response = {
  ScrapDTTM: string;
  SentNation: string;
  SentCurrency: string;
  SiteName: string;
  RemitMethod: string;
  RemitMethodCd: string;
  SentAmt: number;
  RecvAmt: number;
};
