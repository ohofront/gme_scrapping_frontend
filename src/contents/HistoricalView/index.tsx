import styled from "styled-components";
import { defaultHistoricalViewArrayDummy } from "../../dummy/HistoricalView";
import { useEffect, useState } from "react";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";
import { Table } from "../../models/table/tableModel";
import Timer from "../../component/Timer";
import { HistoricalViewModel, View } from "../../models/view/viewModel";
import Loading from "../../component/Loading";
import DateSelect from "../../component/DatePicker";
import Dropdown from "../../component/Dropdown";
import { countries } from "../../enum/country";
import { getHistoricalView } from "../../api/HistoricalView";
import LineChart2 from "../../component/LineChart2";
import FeedTab from "../../component/FeedTab";
import { HistoryScrappingData } from "../../dummy/RowData";

export const InitialParams: Params = {
  startDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
  country: "",
  isHistory: "Y",
  period: "D",
};

const HistoricalView = () => {
  const START_SECOND = 60;

  const [param, setParam] = useState<Params>(InitialParams);
  const [history, setHistory] = useState<ResponseParams[]>([]);
  const [table, setTable] = useState<Table[]>([]);
  const [chart, setChart] = useState<View[]>([]);
  const [chart2, setChart2] = useState<HistoricalViewModel[]>(
    defaultHistoricalViewArrayDummy
  );

  const [startDate, setStartDate] = useState(new Date());
  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("Nepal");
  const [period, setPeriod] = useState<string>("D");

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
    setLoading(true);
    try {
      await getHistoricalView(param)
        .then((response: any) => {
          console.log("Historical response data:::", response.data);

          setHistory(response.data);
        })
        .catch((error) => {
          console.log(error);
          setHistory(HistoryScrappingData);
        });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const chartValues = history.reduce((acc: any, cur: any) => {
      const countryIndex = acc.findIndex(
        (item: any) => item.country === cur.SentNation
      );
      if (countryIndex === -1) {
        acc.push({
          country: cur.SentNation,
          competitors: [
            {
              company: cur.SiteName,
              info: [
                {
                  amount: cur.RecvAmt,
                  date: cur.ScrapDTTM,
                },
              ],
            },
          ],
        });
      } else {
        acc[countryIndex].competitors.push({
          company: cur.SiteName,
          info: [
            {
              amount: cur.RecvAmt,
              date: cur.ScrapDTTM,
            },
          ],
        });
      }
      return acc;
    }, []);
    console.log("Historical chartValues", chartValues);
    setChart(chartValues);
  }, [history]);

  useEffect(() => {
    const reuninedValues = history.reduce((acc: any, cur: any) => {
      const companyIndex = acc.findIndex(
        (item: any) => item.company === cur.SiteName
      );
      if (companyIndex === -1) {
        acc.push({
          company: cur.SiteName,
          competitors: [
            {
              country: cur.SentNation,
              amount: cur.RecvAmt,
              date: cur.ScrapDTTM,
            },
          ],
        });
      } else {
        acc[companyIndex].competitors.push({
          country: cur.SentNation,
          amount: cur.RecvAmt,
          date: cur.ScrapDTTM,
        });
      }
      return acc;
    }, []);
    console.log("reuninedValues", reuninedValues);
    setChart2(reuninedValues);
  }, [history]);

  // useEffect(() => {
  //   const tableValues = history.reduce((acc: any, cur: any) => {
  //     const countryIndex = acc.findIndex(
  //       (item: any) => item.country === cur.SentNation
  //     );
  //     if (countryIndex === -1) {
  //       acc.push({
  //         country: cur.SentNation,
  //         company: cur.SiteName,
  //         amount: currencyFormatter(cur.RecvAmt),
  //       });
  //     } else {
  //       acc.push({
  //         country: cur.SentNation,
  //         company: cur.SiteName,
  //         amount: currencyFormatter(cur.RecvAmt),
  //       });
  //     }
  //     return acc;
  //   }, []);
  //   console.log("Historical tableValues", tableValues);
  //   setTable(tableValues);
  // }, [history]);

  // useEffect(() => {
  //   // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
  //   const interval = setInterval(() => {
  //     // 타이머 숫자가 하나씩 줄어들도록
  //     setCount((count) => count - 1);
  //   }, 1000);
  //   // 0이 되면 카운트가 멈춤
  //   if (count === 0) {
  //     setLoading(true);
  //     setCount(START_SECOND);
  //   }
  //   if (count === 60) {
  //     fetch();
  //   }
  //   return () => clearInterval(interval);
  //   // 카운트 변수가 바뀔때마다 useEffect 실행
  // }, [count]);

  useEffect(() => {
    // 설정된 시간 간격마다 setInterval 콜백이 실행된다.
    const interval = setInterval(() => {
      // 타이머 숫자가 하나씩 줄어들도록
      setCount((count) => count - 1);
    }, 1000);
    // 0이 되면 카운트가 멈춤
    if (param) {
      setLoading(true);
      setCount(START_SECOND);
    }
    if (param) {
      fetch();
    }
    return () => clearInterval(interval);
    // 카운트 변수가 바뀔때마다 useEffect 실행
  }, [param]);

  return (
    <MainWrapper>
      <SearchBox>
        <div className="top">
          {/* <Timer count={count} /> */}
          <Dropdown
            defaultTitle="국가"
            optionData={countries}
            currentOption={country}
            setCurrentOption={setCountry}
          />
          <DateTimeWrapper>
            {/* <DateInput
              defaultTitle="조회 시간"
              searchDate={moment(live[0]?.ScrapDTTM).format("YYYY-MM-DD HH:mm")}
            /> */}
            {/* <DateSelect
              defaultTitle="조회시간"
              startDate={startDate}
              setStartDate={setStartDate}
            /> */}
            <FeedTab period={period} setPeriod={setPeriod} />
          </DateTimeWrapper>
        </div>
        {/* <div className="down">
          <FeedTab period={period} setPeriod={setPeriod} />
        </div> */}
      </SearchBox>
      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : history.length > 0 ? (
          <>
            <ChartWrapper>
              <LineChart2 props={chart2} />
              {/* <LineChart3 props={chart2} /> */}
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
  height: 100px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  vertical-align: middle;
  padding-top: 30px;
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
