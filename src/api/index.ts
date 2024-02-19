import axios from "axios";

const apiUrl = process.env.REACT_APP_SERVICE_URL;

type ScrapApi = {
  url: string;
  method: string;
  data?: Object;
  params?: Object | null;
};

export const fetchScrapApi = ({ url, method, data, params }: ScrapApi) => {
  const response = axios({
    url: apiUrl + url,
    method: method,
    data: data,
    params: params,
  });
  return response;
};
