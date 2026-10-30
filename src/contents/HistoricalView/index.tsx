import styled from "styled-components";
import { defaultHistoricalViewArrayDummy } from "../../dummy/HistoricalView";
import { useEffect, useState, useCallback } from "react";
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
import { FiGlobe, FiCreditCard, FiAlertCircle } from "react-icons/fi";
import { currencyFormatter } from "../../function/currencyFormatter";

export const InitialParams: Params = {
  startDttm: new Date(),
  remitMethodCode: "BDP01",
  format: "json",
  country: "Nepal",
  isHistory: "Y",
  period: "D",
};

const HistoricalView = () => {
  const [param, setParam] = useState<Params>(InitialParams);
  const [history, setHistory] = useState<ResponseParams[]>([]);
  const [chart, setChart] = useState<HistoricalViewModel[]>(
    defaultHistoricalViewArrayDummy
  );

  const [method, setMethod] = useState<RemitMethodCode>("BDP01");
  const [country, setCountry] = useState<string>("Nepal");
  const [period, setPeriod] = useState<string>("D");

  const [loading, setLoading] = useState(true);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await getHistoricalView(param)
        .then((response: any) => {
          if (response && response.data && response.data.length > 0) {
            setHistory(response.data);
          } else {
            setHistory(HistoryScrappingData);
          }
        })
        .catch((error) => {
          console.log("Historical view API fallback:", error);
          setHistory(HistoryScrappingData);
        });
    } catch (e) {
      console.log(e);
      setHistory(HistoryScrappingData);
    } finally {
      setLoading(false);
    }
  }, [param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!history || history.length === 0) return;

    const reuninedValues = history.reduce((acc: any, cur: any) => {
      const companyIndex = acc.findIndex(
        (item: any) => item.company === cur.SiteName
      );
      if (companyIndex === -1) {
        acc.push({
          id: acc.length + 1,
          company: cur.SiteName,
          country: cur.SentNation,
          changeunit: cur.SentCurrency,
          competitors: [
            {
              id: 1,
              amount: cur.RecvAmt,
              date: cur.ScrapDTTM,
            },
          ],
        });
      } else {
        acc[companyIndex].competitors.push({
          id: acc[companyIndex].competitors.length + 1,
          amount: cur.RecvAmt,
          date: cur.ScrapDTTM,
        });
      }
      return acc;
    }, []);
    setChart(reuninedValues);
  }, [history]);

  const activeCountry = chart[0]?.country || country || "Nepal";
  const activeCurrency = chart[0]?.changeunit || "BD";

  return (
    <Container>
      {/* Filter and Period Toolbar */}
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
          <FeedTab period={period} setPeriod={setPeriod} />
        </FilterGroup>
      </FilterBar>

      {/* Country & Corridor Header */}
      <CorridorSummaryBanner>
        <BannerLeft>
          <CountryFlag>
            {activeCountry === "Nepal" ? "🇳🇵" : activeCountry === "Vietnam" ? "🇻🇳" : "🌐"}
          </CountryFlag>
          <div>
            <CorridorTitle>
              {activeCountry} <CurrencyTag>({activeCurrency})</CurrencyTag>
            </CorridorTitle>
            <CorridorSubtitle>
              실시간 수집 환율 시계열 분석 • 기준 송금액: 100,000 KRW
            </CorridorSubtitle>
          </div>
        </BannerLeft>

        <BannerRight>
          <SummaryPill>
            <span className="pill-label">비교 업체:</span>
            <span className="pill-value">{chart.length}개사</span>
          </SummaryPill>
          <SummaryPill>
            <span className="pill-label">데이터 구간:</span>
            <span className="pill-value">
              {period === "D" ? "최근 24시간" : period === "W" ? "최근 7일" : period === "M" ? "최근 30일" : "연간"}
            </span>
          </SummaryPill>
        </BannerRight>
      </CorridorSummaryBanner>

      {/* Main Historical Chart */}
      {loading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : chart.length > 0 ? (
        <ContentWrapper>
          <LineChart props={chart} />

          {/* Historical Rate Summary Table */}
          <HistoryTableCard>
            <HistoryTableTitle>
              경쟁사별 최근 수취 금액 데이터 요약
            </HistoryTableTitle>
            <StyledTable>
              <thead>
                <tr>
                  <th>업체명</th>
                  <th>국가</th>
                  <th>통화</th>
                  <th style={{ textAlign: "right" }}>최근 수취액</th>
                  <th style={{ textAlign: "right" }}>평균 수취액</th>
                  <th style={{ textAlign: "right" }}>최고 수취액</th>
                  <th style={{ textAlign: "right" }}>최저 수취액</th>
                </tr>
              </thead>
              <tbody>
                {chart.map((provider, index) => {
                  const amounts = provider.competitors.map((c) => c.amount);
                  const latest = amounts[amounts.length - 1] || 0;
                  const avg = Math.round(amounts.reduce((a, b) => a + b, 0) / (amounts.length || 1));
                  const max = Math.max(...amounts);
                  const min = Math.min(...amounts);
                  const isGME = provider.company.toUpperCase() === "GME";

                  return (
                    <tr key={index} style={{ backgroundColor: isGME ? "rgba(220, 38, 38, 0.08)" : "transparent" }}>
                      <td>
                        <span style={{ fontWeight: 700, color: isGME ? "#ef4444" : "#f8fafc" }}>
                          {provider.company} {isGME && "(자사)"}
                        </span>
                      </td>
                      <td>{provider.country}</td>
                      <td>{provider.changeunit}</td>
                      <td style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                        {currencyFormatter(latest)}
                      </td>
                      <td style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>
                        {currencyFormatter(avg)}
                      </td>
                      <td style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: "#10b981" }}>
                        {currencyFormatter(max)}
                      </td>
                      <td style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: "#ef4444" }}>
                        {currencyFormatter(min)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </HistoryTableCard>
        </ContentWrapper>
      ) : (
        <EmptyStateCard>
          <FiAlertCircle size={32} color="#f59e0b" />
          <h3>조회된 통계 데이터가 없습니다</h3>
          <p>선택하신 조건의 수집 이력이 존재하지 않습니다.</p>
        </EmptyStateCard>
      )}
    </Container>
  );
};

export default HistoricalView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const CorridorSummaryBanner = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 18px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const BannerLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CountryFlag = styled.span`
  font-size: 32px;
`;

const CorridorTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CurrencyTag = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
`;

const CorridorSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #94a3b8;
`;

const BannerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SummaryPill = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 12px;

  .pill-label {
    color: #94a3b8;
    font-weight: 600;
  }
  .pill-value {
    color: #f8fafc;
    font-weight: 700;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const HistoryTableCard = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 20px;
  overflow-x: auto;
`;

const HistoryTableTitle = styled.h4`
  margin: 0 0 16px 0;
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    padding: 10px 14px;
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  td {
    padding: 12px 14px;
    font-size: 13px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
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
