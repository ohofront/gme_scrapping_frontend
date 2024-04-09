import { AxiosPromise } from "axios"
import { Params } from "../../models/api/apiModel"
import { apiScrapClient } from ".."
import URL_INFO from "../../enum/urllnfo"

export const getHistoricalView = (data: Params): AxiosPromise => {
  return apiScrapClient.get(URL_INFO.HISTORYCAL_VIEW.GET_INFO, {params: data})
}