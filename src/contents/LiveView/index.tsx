import { useEffect, useState } from "react";
// import { getLiveView } from "../../api/LiveView";
import { Params } from "../../models/api/apiModel";
import axios from "axios";
import { Response } from "http-proxy-middleware/dist/types";

export const InitialParams: Params = {
  startDttm: "2024-02-15 10:00:00",
  endDttm: "2024-02-15 10:15:00",
  remitMethodCode: "BDP01",
  format: "json",
};

const LiveView = () => {
  const [param, setParam] = useState<Params>(InitialParams);
  const [live, setLive] = useState<Response[]>([]);
  const apiUrl = process.env.REACT_APP_SERVICE_URL;

  useEffect(() => {
    setParam({
      startDttm: "2024-01-31 10:00:00",
      endDttm: "2024-01-31 10:15:00",
      remitMethodCode: "BDP01",
      format: "json",
    });
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const response = await getLiveView(param);
  //     console.log("response:", response);
  //   })();
  // }, [param]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/GME/gme_scrap/pivot/history`,
        { params: param }
      );
      console.log("response: ", response.data);
      setLive(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/GME/gme_scrap/pivot/history`,
          { params: param }
        );
        console.log("response: ", response.data);
        setLive(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("live:", live);
  }, [live]);
  return <div>라이브뷰</div>;
};
export default LiveView;
