import { useCallback, useEffect, useRef, useState } from "react";
// import { getLiveView } from "../../api/LiveView";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";
import axios from "axios";
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
import { Table } from "../../models/table/tableModel";
import { currencyFormatter } from "../../function/currencyFormatter";
import DateInput from "../../component/DateInput";
import moment from "moment";
import Timer from "../../component/Timer";
import Dropdown from "../../component/Dropdown";
import { countries } from "../../enum/country";

export const InitialParams: Params = {
  startDttm: new Date(),
  endDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
};

const LiveView = () => {
  const [param, setParam] = useState<Params>(InitialParams);
  const [live, setLive] = useState<ResponseParams[]>([]);

  const [chart, setChart] = useState<View[]>([]);
  const [table, setTable] = useState<Table[]>([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("전체");

  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const apiUrl = process.env.REACT_APP_SERVICE_URL;

  const START_SECOND = 60;
  const START_DURATION = 60;
  const [isStop, setIsStop] = useState(false);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isRunning, setIsRunning] = useState(true);
  const [duration, setDuration] = useState(START_DURATION);
  const [count, setCount] = useState(60);
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
      format: "json",
    });
  }, [startDate, endDate, method]);

  useEffect(() => {
    const groupValues = live.reduce((acc: any, cur: any) => {
      const countryIndex = acc.findIndex(
        (item: any) => item.country === cur.SentNation
      );
      if (countryIndex === -1) {
        acc.push({
          country: cur.SentNation,
          competitors: [{ company: cur.SiteName, amount: cur.RecvAmt }],
        });
      } else {
        acc[countryIndex].competitors.push({
          company: cur.SiteName,
          amount: cur.RecvAmt,
        });
      }
      return acc;
    }, []);
    console.log("groupValues", groupValues);
    setChart(groupValues);
  }, [live]);

  useEffect(() => {
    const tableValues = live.reduce((acc: any, cur: any) => {
      const countryIndex = acc.findIndex(
        (item: any) => item.country === cur.SentNation
      );
      if (countryIndex === -1) {
        acc.push({
          country: cur.SentNation,
          company: cur.SiteName,
          amount: currencyFormatter(cur.RecvAmt),
          changeunit:
            currencyFormatter(cur.SentAmt) + "(" + cur.SentCurrency + ")",
        });
      } else {
        acc.push({
          country: cur.SentNation,
          company: cur.SiteName,
          amount: currencyFormatter(cur.RecvAmt),
          changeunit:
            currencyFormatter(cur.SentAmt) + "(" + cur.SentCurrency + ")",
        });
      }
      return acc;
    }, []);
    console.log("tableValues", tableValues);
    setTable(tableValues);
  }, [live]);

  // const resetHandler = () => {
  //   setSeconds(START_SECOND);
  //   setIsRunning(false);
  //   setIsStop(false);
  //   setDuration(START_DURATION);
  // };

  // const startHandler = () => {
  //   setDuration(START_SECOND);
  //   setIsRunning(true);
  // };

  // const stopHandler = () => {
  //   setIsStop(true);
  //   setIsRunning(false);
  // };

  // const resumeHandler = () => {
  //   let newDuration = currentSeconds;
  //   setDuration(newDuration);

  //   setIsRunning(true);
  //   setIsStop(false);
  // };

  // useEffect(() => {
  //   if (isRunning === true) {
  //     let timer = duration;
  //     var seconds: number = 0;
  //     const interval = setInterval(function () {
  //       if (--timer <= 0) {
  //         resetHandler();
  //       } else {
  //         seconds = timer;
  //         seconds = seconds < 10 ? 0 + seconds : seconds;
  //         setSeconds(seconds);
  //       }
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [isRunning]);

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
  //   console.log("chart:", chart);
  // },[chart])

  // useEffect(() => {
  //   console.log("table:", table);
  // },[table])

  // useEffect(() => {
  //   console.log("params:", param);
  // }, [param])

  // useEffect(() => {
  //   console.log("count", count);
  // },[count])

  // useEffect(() => {
  //   console.log(loading);
  // },[loading])

  useEffect(() => {
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    const interval = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      setCount((count) => count - 1);
    }, 1000);
    // 0이 되면 카운트가 멈춤
    if (count === 0) {
      setLoading(true);
      setCount(START_SECOND);
    }
    if (count === 60) {
      fetch();
    }
    return () => clearInterval(interval);
    // 카운트 변수가 바뀔때마다 useEffect 실행
  }, [count]);

  return (
    <MainWrapper>
      <SearchBox>
        <div className="top">
          <Dropdown
            defaultTitle="국가"
            optionData={countries}
            currentOption={country}
            setCurrentOption={setCountry}
          />
          <SelectBox
            defaultTitle="송금 코드"
            optionData={selectData}
            currentOption={method}
            setCurrentOption={setMethod}
          />
          <SearchFunction defaultTitle="조회" />
          {/* {!isRunning && !isStop && (
              <button
                onClick={startHandler}
                className="btn btn-primary btn-lg inline me-3"
              >
               START
              </button>
            )}
            {isRunning && (
              <button
                onClick={stopHandler}
                className="btn btn-danger btn-lg inline me-3"
              >
              STOP
              </button>
            )}
            {isStop && (
             <button
              onClick={resumeHandler}
              className="btn btn-success btn-lg inline me-3"
             >
              RESUME
             </button>
            )} */}
        </div>
        <div className="down">
          <DateTimeWrapper>
            <DateInput
              defaultTitle="조회 시간"
              searchDate={moment(live[0]?.ScrapDTTM).format("YYYY-MM-DD HH:mm")}
            />
          </DateTimeWrapper>
          <Timer count={count} />

          {/* <DateSelect
            defaultTitle="기간"
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          /> */}
        </div>
      </SearchBox>

      {/* <DateTimeWrapper>
           <DateInput defaultTitle="조회 시간" searchDate={moment(live[0]?.ScrapDTTM).format('YYYY-MM-DD HH:mm')} />
         </DateTimeWrapper> */}

      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : live.length > 0 ? (
          <>
            <TableWrapper>
              <DataTable headers={headers} items={table} selectable={false} />
            </TableWrapper>
            <ChartWrapper>
              {chart.map((item: View, index: number) => {
                return (
                  <Content key={index}>
                    <BarChart props={item} />
                  </Content>
                );
              })}
            </ChartWrapper>
          </>
        ) : null}
      </ContentWrapper>
    </MainWrapper>
  );
};
export default LiveView;

const MainWrapper = styled.div`
  flex-direction: column;
  width: 100%;
`;
const TableWrapper = styled.div`
  width: 50%;
  height: 200px;
`;

const ChartWrapper = styled.div`
  margin: 10px 0px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  float: right;
  display: grid;
  grid-template-columns: 600px 600px;
  grid-gap: 50px;
`;

const Content = styled.div`
  padding: 10px 10px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  vertical-align: middle;
  margin-bottom: 50px;
  .top {
    display: flex;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    float: top;
  }
  .down {
    display: flex;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    float: down;
  }
`;
const DateTimeWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;
