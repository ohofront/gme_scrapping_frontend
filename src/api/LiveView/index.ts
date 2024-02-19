import { fetchScrapApi } from "..";
import { Params } from "../../models/api/apiModel";

export const getLiveView = async (params: Params) => {
  console.log("params: ", params);

  try {
    const result = await fetchScrapApi({
      url: "/GME/gme_scrap/pivot/history",
      method: "get",
      data: {},
      params: params,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
