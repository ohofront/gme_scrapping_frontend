import { useEffect, useState } from "react";
// import { getLiveView } from "../../api/LiveView";
import { Params } from "../../models/api/apiModel";
import axios from "axios";
import { Response } from "http-proxy-middleware/dist/types";
import SelectBox from "../../component/SelectBox";
import styled from "styled-components";
import { DataTable } from "../../component/DataTable";
import { ListViewDummy } from "../../dummy/LiveView";
import { View } from "../../models/view/viewModel";
import { headers, items } from "../../dummy/DataTable";
import BarChart from "../../component/BarChart";

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
  const selectData = [
    { key: 1, value: "BDP01" },
    { key: 2, value: "BPM01" },
    { key: 3, value: "BDP01(USD)" },
    { key: 4, value: "BPM01(USD)" },
  ];

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
    console.log("live:", live);
  }, []);

  return (
    <MainWrapper>
         <SelectBox optionData={selectData} />
          <TableWrapper>
             <DataTable headers={headers} items={items} selectable={false}/>
          </TableWrapper>
          <ChartWrapper>    
             {ListViewDummy.map((item: View ,index: number) => {
              return(
               <Content key={index}>
                 <BarChart props={item}/>
               </Content>
               )
             }
           )}     
          </ChartWrapper>
        </MainWrapper>
  )
};
export default LiveView;

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
`
const TableWrapper = styled.div`
  width: 50%;
  height: 200px;
  float: left;
`;

const ChartWrapper = styled.div`
  margin: 50px 10px;
  width: 100%;
  height: 100%;
  background-color:#fff;
  float: right;
  display: grid;
  grid-template-columns: 600px 600px;
  grid-column-gap: 50px;
`;

const Content = styled.div`
  padding: 10px;
  border-radius:10px;
  color: #fff;
  display: flex;
  align-items:center;
  justify-content:center;
`;