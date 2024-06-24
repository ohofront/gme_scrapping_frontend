import styled from "styled-components";
import { defaultHistoricalViewArrayDummy } from "../../dummy/HistoricalView";
import { useEffect, useState } from "react";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";
import { HistoricalViewModel } from "../../models/view/viewModel";
import Loading from "../../components/Loading";
import Dropdown from "../../components/Dropdown";
import { countries } from "../../enum/country";
import { getHistoricalView } from "../../api/HistoricalView";
import LineChart from "../../components/LineChart";
import FeedTab from "../../components/FeedTab";
import { HistoryScrappingData } from "../../dummy/RowData";
import { FormattedMessage } from "react-intl";
import { remitMethods } from "../../enum/remitmethod";

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
  const [chart, setChart] = useState<HistoricalViewModel[]>(
    defaultHistoricalViewArrayDummy
  );

  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("Nepal");
  const [period, setPeriod] = useState<string>("D");

  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(60);

  useEffect(() => {
    setParam({
      startDttm: new Date(),
      remitMethodCode: method,
      country: country,
      format: "json",
      isHistory: "Y",
      period: period,
    });
  }, [period, method, country]);

  const fetch = async () => {
    setLoading(true);
    try {
      await getHistoricalView(param)
        .then((response: any) => {
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
    setChart(reuninedValues);
  }, [history]);

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
          <DateTimeWrapper>
            <FeedTab period={period} setPeriod={setPeriod} />
          </DateTimeWrapper>
        </div>
      </SearchBox>
      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : history.length > 0 ? (
          <>
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
    grid-template-columns: 0.2fr 0.2fr 0.3fr;
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

const ChartWrapper = styled.div`
  width: 100%;
  margin: 10px 10px;
  height: 100%;
  flex-direction: column;
  float: right;
  align-items: center;
  justify-content: center;
`;
