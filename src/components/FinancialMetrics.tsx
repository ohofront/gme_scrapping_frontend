import styled from "styled-components";
import { ResponseParams } from "../models/api/apiModel";
import { currencyFormatter } from "../function/currencyFormatter";
import {
  FiAward,
  FiTrendingUp,
  FiBarChart,
  FiPercent,
  FiClock,
  FiPlay,
  FiPause,
  FiRefreshCw,
} from "react-icons/fi";
import { FormattedMessage } from "react-intl";

interface FinancialMetricsProps {
  data: ResponseParams[];
  count: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onManualRefresh: () => void;
}

const FinancialMetrics = ({
  data,
  count,
  isPaused,
  onTogglePause,
  onManualRefresh,
}: FinancialMetricsProps) => {
  if (!data || data.length === 0) return null;

  // Sorted competitors descending by received amount (highest payout is best)
  const sorted = [...data].sort((a, b) => b.RecvAmt - a.RecvAmt);
  const bestOffer = sorted[0];
  const lowestOffer = sorted[sorted.length - 1];

  const totalSum = data.reduce((acc, cur) => acc + cur.RecvAmt, 0);
  const marketAverage = Math.round(totalSum / data.length);

  const gmeItem = data.find(
    (item) => item.SiteName.toUpperCase() === "GME"
  );
  const gmeRank = gmeItem
    ? sorted.findIndex((item) => item.SiteName.toUpperCase() === "GME") + 1
    : 0;

  const gmeRecvAmt = gmeItem ? gmeItem.RecvAmt : 0;
  const gmeDiffFromAvg = gmeRecvAmt - marketAverage;
  const gmeDiffPct = marketAverage > 0
    ? ((gmeDiffFromAvg / marketAverage) * 100).toFixed(1)
    : "0.0";

  const currencyUnit = data[0]?.SentCurrency || "";
  const progressPercent = Math.max(0, Math.min(100, (count / 60) * 100));

  return (
    <MetricsGrid>
      {/* Card 1: Best Offer */}
      <MetricCard>
        <CardHeader>
          <IconWrapper $variant="gold">
            <FiAward size={18} />
          </IconWrapper>
          <CardTitle>
            <FormattedMessage id="best_offer" />
          </CardTitle>
          <ProviderBadge>{bestOffer?.SiteName}</ProviderBadge>
        </CardHeader>
        <CardBody>
          <MainValue>
            {currencyFormatter(bestOffer?.RecvAmt || 0)}
            <UnitSpan>{currencyUnit}</UnitSpan>
          </MainValue>
          <SubValueText>
            <span className="label">최저치 대비:</span>
            <span className="diff-green">
              +{currencyFormatter((bestOffer?.RecvAmt || 0) - (lowestOffer?.RecvAmt || 0))} {currencyUnit}
            </span>
          </SubValueText>
        </CardBody>
      </MetricCard>

      {/* Card 2: GME Market Position */}
      <MetricCard $highlight>
        <CardHeader>
          <IconWrapper $variant="red">
            <FiTrendingUp size={18} />
          </IconWrapper>
          <CardTitle>
            <FormattedMessage id="gme_rank" />
          </CardTitle>
          <OurBadge>
            <FormattedMessage id="our_service" />
          </OurBadge>
        </CardHeader>
        <CardBody>
          <MainValue>
            <RankNumber>#{gmeRank}</RankNumber>
            <TotalRankSpan>/ {data.length}개사</TotalRankSpan>
          </MainValue>
          <SubValueText>
            GME 수취액:{" "}
            <strong>
              {currencyFormatter(gmeRecvAmt)} {currencyUnit}
            </strong>
          </SubValueText>
        </CardBody>
      </MetricCard>

      {/* Card 3: Market Average */}
      <MetricCard>
        <CardHeader>
          <IconWrapper $variant="blue">
            <FiBarChart size={18} />
          </IconWrapper>
          <CardTitle>
            <FormattedMessage id="market_avg" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <MainValue>
            {currencyFormatter(marketAverage)}
            <UnitSpan>{currencyUnit}</UnitSpan>
          </MainValue>
          <SubValueText>
            기준 송금액: {currencyFormatter(data[0]?.SentAmt || 100000)} KRW
          </SubValueText>
        </CardBody>
      </MetricCard>

      {/* Card 4: GME Spread vs Market Average */}
      <MetricCard>
        <CardHeader>
          <IconWrapper $variant={Number(gmeDiffPct) >= 0 ? "emerald" : "amber"}>
            <FiPercent size={18} />
          </IconWrapper>
          <CardTitle>
            <FormattedMessage id="gme_spread" />
          </CardTitle>
        </CardHeader>
        <CardBody>
          <MainValue
            style={{
              color: Number(gmeDiffPct) >= 0 ? "#10b981" : "#ef4444",
            }}
          >
            {Number(gmeDiffPct) >= 0 ? `+${gmeDiffPct}%` : `${gmeDiffPct}%`}
          </MainValue>
          <SubValueText>
            시장 평균 대비:{" "}
            <span
              style={{
                color: gmeDiffFromAvg >= 0 ? "#10b981" : "#ef4444",
                fontWeight: 700,
              }}
            >
              {gmeDiffFromAvg >= 0 ? `+${currencyFormatter(gmeDiffFromAvg)}` : currencyFormatter(gmeDiffFromAvg)}{" "}
              {currencyUnit}
            </span>
          </SubValueText>
        </CardBody>
      </MetricCard>

      {/* Card 5: Live Feed Status & Timer Controller */}
      <MetricCard>
        <CardHeader>
          <IconWrapper $variant="purple">
            <FiClock size={18} />
          </IconWrapper>
          <CardTitle>
            <FormattedMessage id="scrap_after" />
          </CardTitle>
          <ControllerGroup>
            <MiniActionBtn
              onClick={onTogglePause}
              title={isPaused ? "재개" : "일시정지"}
            >
              {isPaused ? <FiPlay size={12} /> : <FiPause size={12} />}
            </MiniActionBtn>
            <MiniActionBtn onClick={onManualRefresh} title="즉시 동기화">
              <FiRefreshCw size={12} />
            </MiniActionBtn>
          </ControllerGroup>
        </CardHeader>
        <CardBody>
          <TimerValueRow>
            <TimerCountText>
              {isPaused ? "PAUSED" : `${count}s`}
            </TimerCountText>
            <SyncStatusTag $isPaused={isPaused}>
              {isPaused ? "일시정지됨" : "자동 갱신 활성"}
            </SyncStatusTag>
          </TimerValueRow>
          <ProgressBarContainer>
            <ProgressBarFill
              style={{ width: `${progressPercent}%` }}
              $isPaused={isPaused}
            />
          </ProgressBarContainer>
        </CardBody>
      </MetricCard>
    </MetricsGrid>
  );
};

export default FinancialMetrics;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const MetricCard = styled.div<{ $highlight?: boolean }>`
  background: ${(props) =>
    props.$highlight
      ? "linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(17, 24, 39, 0.95) 100%)"
      : "rgba(17, 24, 39, 0.85)"};
  border: 1px solid
    ${(props) =>
      props.$highlight ? "rgba(220, 38, 38, 0.4)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) =>
      props.$highlight ? "rgba(220, 38, 38, 0.6)" : "rgba(255, 255, 255, 0.18)"};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div<{ $variant: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    switch (props.$variant) {
      case "gold":
        return "rgba(245, 158, 11, 0.15)";
      case "red":
        return "rgba(220, 38, 38, 0.2)";
      case "blue":
        return "rgba(59, 130, 246, 0.15)";
      case "emerald":
        return "rgba(16, 185, 129, 0.15)";
      case "amber":
        return "rgba(245, 158, 11, 0.15)";
      case "purple":
        return "rgba(168, 85, 247, 0.15)";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};
  color: ${(props) => {
    switch (props.$variant) {
      case "gold":
        return "#f59e0b";
      case "red":
        return "#ef4444";
      case "blue":
        return "#3b82f6";
      case "emerald":
        return "#10b981";
      case "amber":
        return "#f59e0b";
      case "purple":
        return "#a855f7";
      default:
        return "#f1f5f9";
    }
  }};
`;

const CardTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: -0.2px;
`;

const ProviderBadge = styled.span`
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
`;

const OurBadge = styled.span`
  margin-left: auto;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 6px;
  background: #dc2626;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MainValue = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #f8fafc;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

const UnitSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

const RankNumber = styled.span`
  color: #ef4444;
  font-size: 26px;
  font-weight: 900;
`;

const TotalRankSpan = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #94a3b8;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

const SubValueText = styled.div`
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 4px;

  .diff-green {
    color: #10b981;
    font-weight: 700;
  }
`;

const ControllerGroup = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MiniActionBtn = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const TimerValueRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const TimerCountText = styled.div`
  font-size: 20px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  color: #f8fafc;
`;

const SyncStatusTag = styled.span<{ $isPaused: boolean }>`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => (props.$isPaused ? "#f59e0b" : "#10b981")};
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 4px;
`;

const ProgressBarFill = styled.div<{ $isPaused: boolean }>`
  height: 100%;
  background: ${(props) => (props.$isPaused ? "#f59e0b" : "#3b82f6")};
  transition: width 0.9s linear;
`;
