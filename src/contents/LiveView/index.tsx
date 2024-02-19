import { useEffect, useState } from "react";
import { getLiveView } from "../../api/LiveView";
import { Params } from "../../models/api/apiModel";

export const InitialParams: Params = {
  startDttm: "2024-01-31 10:00:00",
  endDttm: "2024-01-31 10:15:00",
  remitMethodCode: "BDP01",
  format: "json",
};

const LiveView = () => {
  const [param, setParam] = useState<Params>(InitialParams);
  useEffect(() => {
    setParam({
      startDttm: "2024-01-31 10:00:00",
      endDttm: "2024-01-31 10:15:00",
      remitMethodCode: "BDP01",
      format: "json",
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getLiveView(param);
      console.log("response:", response);
    })();
  }, [param]);

  return <div>라이브뷰</div>;
};
export default LiveView;
