import { AxiosPromise } from "axios";
import { apiScrapClient } from "..";
import { Params } from "../../models/api/apiModel";
import URL_INFO from "../../enum/urllnfo";

type ScrapApi = {
  url: string;
  method: string;
  data?: Object;
  params?: Object | null;
};

export const getLiveView = (data: Params): AxiosPromise => {
  console.log("params: ", data);
  return apiScrapClient.get(URL_INFO.LIVE_VIEW.GET_INFO, {params: data})
};
