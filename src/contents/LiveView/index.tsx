import { useEffect, useState, useCallback } from "react";
import {
  Params,
  RemitMethodCode,
  ResponseParams,
} from "../../models/api/apiModel";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { View } from "../../models/view/viewModel";
import BarChart from "../../components/BarChart";
import Loading from "../../components/Loading";
import { Table } from "../../models/table/tableModel";
import { currencyFormatter } from "../../function/currencyFormatter";
import DateInput from "../../components/DateInput";
import moment from "moment";
import Dropdown from "../../components/Dropdown";
import { countries } from "../../enum/country";
import { remitMethods } from "../../enum/remitmethod";
import { getLiveView } from "../../api/LiveView";
import { LiveScrappingData } from "../../dummy/RowData";
import DataTable from "../../components/DataTable";
import FinancialMetrics from "../../components/FinancialMetrics";
import { FiGlobe, FiCreditCard, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

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
  const [isLiveApiConnected, setIsLiveApiConnected] = useState<boolean | null>(null);

  const [chart, setChart] = useState<View[]>([]);
  const [table, setTable] = useState<Table[]>([]);

  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const START_SECOND = 60;
  const [count, setCount] = useState(START_SECOND);
  const [isPaused, setIsPaused] = useState(false);

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

  // Aggregate data for bar chart
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

  // Aggregate data for table
  useEffect(() => {
    const tableValues = live.map((cur) => ({
      country: cur.SentNation,
      company: cur.SiteName,
      amount: currencyFormatter(cur.RecvAmt),
      changeunit: cur.SentCurrency,
      sendAmount: currencyFormatter(cur.SentAmt) + " KRW",
    }));
    setTable(tableValues);
  }, [live]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await getLiveView(param)
        .then((response: any) => {
          if (response && response.data && response.data.length > 0) {
            setLive(response.data);
            setIsLiveApiConnected(true);
          } else {
            setLive(LiveScrappingData);
            setIsLiveApiConnected(false);
          }
        })
        .catch((error) => {
          console.log("Live view API error, using simulation fallback:", error);
          setLive(LiveScrappingData);
          setIsLiveApiConnected(false);
        });
    } catch (e) {
      console.log(e);
      setLive(LiveScrappingData);
      setIsLiveApiConnected(false);
    } finally {
      setLoading(false);
    }
  }, [param]);

  // Fetch when param changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          fetchData();
          return START_SECOND;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, fetchData]);

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleManualRefresh = () => {
    setCount(START_SECOND);
    fetchData();
  };

  return (
    <Container>
      {/* Feed Status Alert Banner */}
      <StatusBar $isConnected={!!isLiveApiConnected}>
        <StatusLeft>
          {isLiveApiConnected ? (
            <FiCheckCircle size={15} color="#10b981" />
          ) : (
            <FiAlertCircle size={15} color="#f59e0b" />
          )}
          <StatusText>
            {isLiveApiConnected ? (
              <FormattedMessage id="status_connected" />
            ) : (
              <span>
                <FormattedMessage id="status_fallback" /> : 백엔드 API 미연결 시 사전 수집된 시뮬레이션 데이터를 자동으로 로드합니다.
              </span>
            )}
          </StatusText>
        </StatusLeft>
        <StatusRight>
          엔드포인트: <code>/GME/gme_scrap/pivot/history</code>
        </StatusRight>
      </StatusBar>

      {/* Filter and Control Toolbar */}
      <FilterBar>
        <FilterGroup>
          <Dropdown
            defaultTitle={<FormattedMessage id="national" />}
            optionData={countries}
            currentOption={country}
            setCurrentOption={setCountry}
            icon={<FiGlobe size={15} />}
          />
          <Dropdown
            defaultTitle={<FormattedMessage id="remit_code" />}
            optionData={remitMethods}
            currentOption={method}
            setCurrentOption={setMethod as any}
            icon={<FiCreditCard size={15} />}
          />
          <DateInput
            defaultTitle={<FormattedMessage id="scrap_date" />}
            searchDate={
              live[0]?.ScrapDTTM
                ? moment(live[0].ScrapDTTM).format("YYYY-MM-DD HH:mm")
                : moment().format("YYYY-MM-DD HH:mm")
            }
          />
        </FilterGroup>
      </FilterBar>

      {/* KPI Financial Metric Cards */}
      <FinancialMetrics
        data={live}
        count={count}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onManualRefresh={handleManualRefresh}
      />

      {/* Main Content Layout: Table & Chart */}
      {loading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : live.length > 0 ? (
        <DashboardGrid>
          <TableColumn>
            <DataTable items={table} />
          </TableColumn>

          <ChartColumn>
            {chart.map((item: View, index: number) => (
              <BarChart key={index} props={item} />
            ))}
          </ChartColumn>
        </DashboardGrid>
      ) : (
        <EmptyStateCard>
          <FiAlertCircle size={32} color="#f59e0b" />
          <h3>조회된 수취 금액 데이터가 없습니다</h3>
          <p>선택하신 조건의 수집 정보가 존재하지 않습니다. 필터 설정을 변경해 보세요.</p>
        </EmptyStateCard>
      )}
    </Container>
  );
};

export default LiveView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StatusBar = styled.div<{ $isConnected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 10px;
  background: ${(props) =>
    props.$isConnected ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.08)"};
  border: 1px solid
    ${(props) =>
      props.$isConnected ? "rgba(16, 185, 129, 0.25)" : "rgba(245, 158, 11, 0.2)"};
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #f1f5f9;
`;

const StatusRight = styled.div`
  font-size: 12px;
  color: #94a3b8;

  code {
    background: rgba(255, 255, 255, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    color: #cbd5e1;
  }
`;

const FilterBar = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const TableColumn = styled.div`
  width: 100%;
`;

const ChartColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const EmptyStateCard = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 60px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  h3 {
    margin: 0;
    color: #f8fafc;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: #94a3b8;
    font-size: 14px;
  }
`;
