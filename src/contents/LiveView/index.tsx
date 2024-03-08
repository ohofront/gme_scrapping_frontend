import { useCallback, useEffect, useRef, useState } from "react";
// import { getLiveView } from "../../api/LiveView";
import { Params, RemitMethodCode } from "../../models/api/apiModel";
import axios from "axios";
import { Response } from "http-proxy-middleware/dist/types";
import SelectBox from "../../component/SelectBox";
import styled from "styled-components";
import { DataTable } from "../../component/DataTable";
import { ListViewDummy } from "../../dummy/LiveView";
import { View } from "../../models/view/viewModel";
import { headers, items } from "../../dummy/DataTable";
import BarChart from "../../component/BarChart";
import DateSelect from "../../component/DatePicker";
import Loading from "../../component/Loading";
import SearchFunction from "../../component/SearchFunction";

export const InitialParams: Params = {
  startDttm: new Date(),
  endDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
};

const LiveView = () => {
  const [param, setParam] = useState<Params>(InitialParams);
  const [live, setLive] = useState<Response[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [method, setMethod] = useState<RemitMethodCode>('BDP01');
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const apiUrl = process.env.REACT_APP_SERVICE_URL;
  const selectData = [
    { key: 1, value: "BDP01" },
    { key: 2, value: "BPM01" },
    { key: 3, value: "BDP01(USD)" },
    { key: 4, value: "BPM01(USD)" },
  ];

  useEffect(() => {
    setParam({
      startDttm: startDate,
      endDttm: endDate,
      remitMethodCode: method,
      format: 'json'
    })
  },[startDate, endDate, method])

  // useEffect(() => {
  //   setParam({
  //     startDttm: "2024-01-31 10:00:00",
  //     endDttm: "2024-01-31 10:15:00",
  //     remitMethodCode: "BDP01",
  //     format: "json",
  //   });
  // }, []);

  
  // useEffect(() => {
  //   (async () => {
  //     const response = await getLiveView(param);
  //     console.log("response:", response);
  //   })();
  // }, [param]);

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/GME/gme_scrap/pivot/history`,
        { params: param }
      );
      console.log("response: ", response.data);
      setLive(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${apiUrl}/GME/gme_scrap/pivot/history`,
  //         { params: param }
  //       );
  //       console.log("response: ", response.data);
  //       setLive(response.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log("live:", live);
  },[live])

  useEffect(() => {
    console.log("loading:", loading);
  },[loading])
  
  useEffect(() => {
    console.log("params:", param);
  }, [param])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
      setLoading(true);
    }, 60000);
    return() => clearInterval(interval);
  }, [loading]);

  // const handleRestart = () => {
  //   if (!timerRef.current) {
  //     timerRef.current = fetch();
  //   }
  // };

  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  return (
    <MainWrapper>

         {/* <button onClick={handleRestart}>restart</button> */}
         <SearchBox>
            <div className="left">
               <SearchFunction defaultTitle="조회" />
            </div>
            <div className="right">
              <SelectBox defaultTitle="송금 코드" optionData={selectData} currentOption={method} setCurrentOption={setMethod} />
              <DateSelect defaultTitle="기간" startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
              <SearchFunction defaultTitle="조회" />
            </div>
         </SearchBox>

         <ContentWrapper>
          {loading ? (
            <Loading/>
          ) : 
            live.length > 0 ?
             <>
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
             </>
             : null
          }
            
         </ContentWrapper>

    </MainWrapper>
  )
};
export default LiveView;

const MainWrapper = styled.div`
  flex-direction: column;
  width: 100%;
  padding: 50px;
`
const TableWrapper = styled.div`
  width: 50%;
  height: 200px;
`;

const ChartWrapper = styled.div`
  margin: 50px 0px;
  width: 100%;
  height: 100%;
  background-color:#fff;
  float: right;
  display: grid;
  grid-template-columns: 600px 600px;
  grid-gap: 50px;
`;

const Content = styled.div`
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  align-items:center;
  justify-content:center;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  vertical-align: middle;
  margin-bottom: 100px;
  .left {
    display: grid;
    grid-template-columns: 1fr;
    width: 30%;
    float: left;
  }
  .right {
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.5fr;
    width: 70%;
    float: right;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;