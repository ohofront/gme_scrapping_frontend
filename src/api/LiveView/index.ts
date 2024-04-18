import { AxiosPromise } from "axios";
import { apiScrapClient } from "..";
import { Params } from "../../models/api/apiModel";
import URL_INFO from "../../enum/urllnfo";

export const getLiveView = (data: Params): AxiosPromise => {
  return apiScrapClient.get(URL_INFO.LIVE_VIEW.GET_INFO, {params: data})
};
