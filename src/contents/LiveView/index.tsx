import { useEffect, useState } from "react";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { View } from "../../models/view/viewModel";
import { headers } from "../../dummy/DataTable";
import BarChart from "../../components/BarChart";
import Loading from "../../components/Loading";
import { Table } from "../../models/table/tableModel";
import { currencyFormatter } from "../../function/currencyFormatter";
import DateInput from "../../components/DateInput";
import moment from "moment";
import Timer from "../../components/Timer";
import Dropdown from "../../components/Dropdown";
import { countries } from "../../enum/country";
import { remitMethods } from "../../enum/remitmethod";
import { getLiveView } from "../../api/LiveView";
import { LiveScrappingData } from "../../dummy/RowData";
import DataTable from "../../components/DataTable";

export const InitialParams: Params = {
  startDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
  country: "",
  isHistory: "N",
  period: "",
};

const LiveView = () => {
  const [param, setParam] = useState<Params>(InitialParams);
  const [live, setLive] = useState<ResponseParams[]>([]);

  const [chart, setChart] = useState<View[]>([]);
  const [table, setTable] = useState<Table[]>([]);

  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const START_SECOND = 60;
  const [count, setCount] = useState(60);

  useEffect(() => {
    setParam({
      startDttm: new Date(),
      remitMethodCode: method,
      country: country,
      format: "json",
      isHistory: "N",
      period: "",
    });
  }, [method, country]);

  useEffect(() => {
    const chartValues = live.reduce((acc: any, cur: any) => {
      const countryIndex = acc.findIndex(
        (item: any) =>
          item.country === cur.SentNation &&
          item.changeunit === cur.SentCurrency
      );
      if (countryIndex === -1) {
        acc.push({
          country: cur.SentNation,
          changeunit: cur.SentCurrency,
          competitors: [
            {
              company: cur.SiteName,
              amount: cur.RecvAmt,
            },
          ],
        });
      } else {
        acc[countryIndex].competitors.push({
          company: cur.SiteName,
          amount: cur.RecvAmt,
        });
      }
      return acc;
    }, []);
    setChart(chartValues);
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
    setTable(tableValues);
  }, [live]);

  const fetch = async () => {
    setLoading(true);
    try {
      await getLiveView(param)
        .then((response: any) => setLive(response.data))
        .catch((error) => {
          console.log("error", error);
          setLive(LiveScrappingData);
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

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

  useEffect(() => {
    if (param) {
      fetch();
    }
  }, [param]);

  return (
    <MainWrapper>
      <SearchBox>
        <div className="top">
          <Dropdown
            defaultTitle={<FormattedMessage id="national" />}
            optionData={countries}
            currentOption={country}
            setCurrentOption={setCountry}
          />
          <Dropdown
            defaultTitle={<FormattedMessage id="remit_code" />}
            optionData={remitMethods}
            currentOption={method}
            setCurrentOption={setMethod}
          />
        </div>
        <div className="down">
          <DateTimeWrapper>
            <DateInput
              defaultTitle={<FormattedMessage id="scrap_date" />}
              searchDate={moment(live[0]?.ScrapDTTM).format("YYYY-MM-DD HH:mm")}
            />
          </DateTimeWrapper>

          <Timer count={count} />
        </div>
      </SearchBox>

      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : live.length > 0 ? (
          <>
            <TableWrapper>
              <DataTable items={table} headers={headers} />
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
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 50,
                fontWeight: "bold",
                // alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                alignContent: "center",
              }}
            >
              정보를 불러오는 중입니다...
            </div>
          </div>
        )}
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
  height: 100%;
  padding-left: 50px;
`;

const ChartWrapper = styled.div`
  margin: 10px 0px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  float: right;
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-gap: 30px;
  padding-right: 50px;
`;

const Content = styled.div`
  border-radius: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBox = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  vertical-align: middle;
  padding-top: 30px;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  .top {
    display: grid;
    grid-template-columns: 0.3fr 0.3fr;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .down {
    display: grid;
    grid-template-columns: 0.3fr 0.3fr;
    width: 100%;
    align-items: center;
    justify-content: center;
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

const ChooseSearch = styled.div`
  /* 공통 스타일 */
  display: flex;
  position: relative;
  width: 100%;
  gap: 500px;
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  box-sizing: border-box;
  border: none;
`;
