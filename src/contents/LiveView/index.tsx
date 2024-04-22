import { useEffect, useState } from "react";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";

import styled from "styled-components";
import { DataTable } from "../../component/DataTable";
import { View } from "../../models/view/viewModel";
import { headers } from "../../dummy/DataTable";
import BarChart from "../../component/BarChart";
import Loading from "../../component/Loading";
import { Table } from "../../models/table/tableModel";
import { currencyFormatter } from "../../function/currencyFormatter";
import DateInput from "../../component/DateInput";
import moment from "moment";
import Timer from "../../component/Timer";
import Dropdown from "../../component/Dropdown";
import { countries } from "../../enum/country";
import { remitMethods } from "../../enum/remitmethod";
import Button from "../../component/Button";
import { getLiveView } from "../../api/LiveView";
import Modal from "../../component/Modal";

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

  const [startDate, setStartDate] = useState(new Date());
  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const START_SECOND = 60;
  const [count, setCount] = useState(60);
  const [isSearchModal, setIsSearchModal] = useState(false);

  useEffect(() => {
    setParam({
      startDttm: startDate,
      remitMethodCode: method,
      country: country,
      format: "json",
      isHistory: "N",
      period: "",
    });
  }, [startDate, method, country]);

  useEffect(() => {
    const chartValues = live.reduce((acc: any, cur: any) => {
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
    console.log("chartValues", chartValues);
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
    console.log("tableValues", tableValues);
    setTable(tableValues);
  }, [live]);

  // const fetch = async () => {
  //   setLoading(true);
  //   setIsSearchModal(false);
  //   try {
  //     const response = await axios.get(
  //       `${apiUrl}/GME/gme_scrap/pivot/history`,
  //       { params: param }
  //     );
  //     console.log("response: ", response.data);
  //     setLive(response.data);
  //     setLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const fetch = async () => {
    setLoading(true);
    setIsSearchModal(false);
    try {
      await getLiveView(param)
        .then((response: any) => setLive(response.data))
        .catch((error) => console.log(error));
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = () => {
    setIsSearchModal(true);
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
          <Dropdown
            defaultTitle="송금 코드"
            optionData={remitMethods}
            currentOption={method}
            setCurrentOption={setMethod}
          />
          <Button
            outline={false}
            color="red"
            font="black"
            fontSize={20}
            height="50px"
            width="200px"
            borderRadius="12px"
            onClick={handleSearch}
            disabled={false}
          >
            조회
          </Button>
        </div>
        <div className="down">
          <DateTimeWrapper>
            <DateInput
              defaultTitle="스크래핑 시간"
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
      {isSearchModal && (
        <Modal
          visible={isSearchModal}
          title="스크래핑 조회"
          confirmText="조회"
          onConfirm={fetch}
          onClose={() => setIsSearchModal(false)}
          height={500}
        >
          이렇게 조회하시겠습니까?
          <ChooseSearch>{country === "" ? "전체" : country}</ChooseSearch>
          <ChooseSearch>{method}</ChooseSearch>
        </Modal>
      )}
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
  height: 200px;
  border: 1px solid #dddddd;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  vertical-align: middle;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  .top {
    display: grid;
    grid-template-columns: 0.2fr 0.2fr 0.2fr;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .down {
    display: grid;
    grid-template-columns: 0.25fr 0.35fr;
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
