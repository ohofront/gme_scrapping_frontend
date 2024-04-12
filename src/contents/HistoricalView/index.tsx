import styled from "styled-components";
import { DataTable } from "../../component/DataTable";
import { headers, items } from "../../dummy/DataTable";
import { HistoricalListViewDummy } from "../../dummy/HistoricalView";
import LineChart from "../../component/LineChart";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";
import { Table } from "../../models/table/tableModel";
import { currencyFormatter } from "../../function/currencyFormatter";
import Timer from "../../component/Timer";
import DateInput from "../../component/DateInput";
import moment from "moment";
import { View } from "../../models/view/viewModel";
import Loading from "../../component/Loading";
import DateSelect from "../../component/DatePicker";

export const InitialParams: Params = {
  startDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
  country: "",
  isHistory: "Y",
  period: "D",
};

const HistoricalView = () => {
  const apiUrl = process.env.REACT_APP_SERVICE_URL;
  const START_SECOND = 60;

  const [param, setParam] = useState<Params>(InitialParams);
  const [history, setHistory] = useState<ResponseParams[]>([]);
  const [table, setTable] = useState<Table[]>([]);
  const [chart, setChart] = useState<View[]>([]);

  const [startDate, setStartDate] = useState(new Date());
  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("");
  const [period, setPriod] = useState<string>("D");

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(60);

  useEffect(() => {
    setParam({
      startDttm: startDate,
      remitMethodCode: method,
      country: country,
      format: "json",
      isHistory: "Y",
      period: period,
    });
  }, [period, startDate, method, country]);

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/GME/gme_scrap/pivot/history`,
        { params: param }
      );
      console.log("response: ", response.data);
      setHistory(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const groupValues = history.reduce((acc: any, cur: any) => {
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
  }, [history]);

  useEffect(() => {
    const tableValues = history.reduce((acc: any, cur: any) => {
      const countryIndex = acc.findIndex(
        (item: any) => item.country === cur.SentNation
      );
      if (countryIndex === -1) {
        acc.push({
          country: cur.SentNation,
          company: cur.SiteName,
          amount: currencyFormatter(cur.RecvAmt),
        });
      } else {
        acc.push({
          country: cur.SentNation,
          company: cur.SiteName,
          amount: currencyFormatter(cur.RecvAmt),
        });
      }
      return acc;
    }, []);
    console.log("tableValues", tableValues);
    setTable(tableValues);
  }, [history]);

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
          <Timer count={count} />
          <DateTimeWrapper>
            {/* <DateInput
              defaultTitle="조회 시간"
              searchDate={moment(live[0]?.ScrapDTTM).format("YYYY-MM-DD HH:mm")}
            /> */}
            <DateSelect
              defaultTitle="조회시간"
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </DateTimeWrapper>
        </div>
        <div className="right"></div>
      </SearchBox>
      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : history.length > 0 ? (
          <>
            {/* <TableWrapper>
              <DataTable headers={headers} items={table} selectable={false} />
            </TableWrapper> */}
            <ChartWrapper>
              <LineChart props={chart} />
            </ChartWrapper>
          </>
        ) : null}
      </ContentWrapper>
    </MainWrapper>
  );
};
export default HistoricalView;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  vertical-align: middle;
  margin-bottom: 50px;
  .top {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    width: 100%;
    float: left;
  }
  .right {
    display: grid;
    // grid-template-columns: 1fr 1.5fr 0.5fr;
    // width: 70%;
    width: 50%;
    float: right;
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

const TableWrapper = styled.div`
  width: 50%;
  height: 200px;
  float: left;
`;
const ChartWrapper = styled.div`
  width: 100%;
  margin: 10px 10px;
  height: 100%;
  flex-direction: column;
  float: right;
  align-items: center;
  justify-content: center;
`;
