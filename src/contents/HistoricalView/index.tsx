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

export const InitialParams: Params = {
  startDttm: new Date(),
  endDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
  country: "",
};

const HistoricalView = () => {
  const apiUrl = process.env.REACT_APP_SERVICE_URL;
  const START_SECOND = 60;

  const [param, setParam] = useState<Params>(InitialParams);
  const [live, setLive] = useState<ResponseParams[]>([]);
  const [table, setTable] = useState<Table[]>([]);
  const [chart, setChart] = useState<View[]>([]);

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(60);

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
  }, [live]);

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
        <div className="left">
          <Timer count={count} />
        </div>
        <div className="right">
          <DateTimeWrapper>
            <DateInput
              defaultTitle="조회 시간"
              searchDate={moment(live[0]?.ScrapDTTM).format("YYYY-MM-DD HH:mm")}
            />
          </DateTimeWrapper>
        </div>
      </SearchBox>
      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : live.length > 0 ? (
          <>
            <TableWrapper>
              <DataTable headers={headers} items={table} selectable={false} />
            </TableWrapper>
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
  .left {
    display: grid;
    // grid-template-columns: 1fr;
    width: 30%;
    width: 50%;
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
