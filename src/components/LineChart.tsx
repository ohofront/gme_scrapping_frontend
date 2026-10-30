import { useEffect, useRef, useMemo } from "react";
import { HistoricalViewModel } from "../models/view/viewModel";
import { Chart, registerables } from "chart.js";
import styled from "styled-components";
import { currencyFormatter } from "../function/currencyFormatter";
import moment from "moment";
import { FiTrendingUp, FiActivity, FiArrowUp, FiArrowDown } from "react-icons/fi";

Chart.register(...registerables);

interface Props {
  props: HistoricalViewModel[];
}

const LineChart = ({ props }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Calculate statistics across all historical data
  const stats = useMemo(() => {
    let allAmounts: number[] = [];
    props.forEach((provider) => {
      provider.competitors.forEach((sub) => {
        allAmounts.push(sub.amount);
      });
    });

    if (allAmounts.length === 0) {
      return { peak: 0, trough: 0, spread: 0, dataPoints: 0 };
    }

    const peak = Math.max(...allAmounts);
    const trough = Math.min(...allAmounts);
    const spread = peak - trough;
    return {
      peak,
      trough,
      spread,
      dataPoints: props[0]?.competitors.length || 0,
    };
  }, [props]);

  useEffect(() => {
    if (!chartRef.current || !props || props.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Color mapper for providers
    const getColorForCompany = (name: string) => {
      const upper = name.toUpperCase();
      switch (upper) {
        case "GME":
          return { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", isGME: true };
        case "HANPASS":
          return { color: "#3b82f6", bg: "rgba(59, 130, 246, 0.05)", isGME: false };
        case "GMONEY":
          return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.05)", isGME: false };
        case "COINSHOT":
          return { color: "#10b981", bg: "rgba(16, 185, 129, 0.05)", isGME: false };
        case "JRF":
          return { color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.05)", isGME: false };
        case "E9PAY":
          return { color: "#ec4899", bg: "rgba(236, 72, 153, 0.05)", isGME: false };
        case "MOIN":
          return { color: "#06b6d4", bg: "rgba(6, 182, 212, 0.05)", isGME: false };
        case "CROSS":
          return { color: "#f97316", bg: "rgba(249, 115, 22, 0.05)", isGME: false };
        default:
          return { color: "#94a3b8", bg: "rgba(148, 163, 184, 0.05)", isGME: false };
      }
    };

    // Labels from the first provider's date entries
    const rawLabels = props[0]?.competitors.map((item) => item.date) || [];
    const formattedLabels = rawLabels.map((dateStr) => {
      if (!dateStr) return "";
      const m = moment(dateStr);
      return m.isValid() ? m.format("MM-DD HH:mm") : dateStr;
    });

    const datasets = props.map((item) => {
      const theme = getColorForCompany(item.company);
      return {
        label: item.company,
        data: item.competitors.map((sub) => sub.amount),
        borderColor: theme.color,
        backgroundColor: theme.bg,
        borderWidth: theme.isGME ? 3 : 2,
        tension: 0.35,
        pointRadius: theme.isGME ? 4 : 2,
        pointHoverRadius: theme.isGME ? 7 : 5,
        pointBackgroundColor: theme.color,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1,
        fill: theme.isGME,
      };
    });

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: formattedLabels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#94a3b8",
              font: {
                size: 12,
                weight: "bold",
              },
              usePointStyle: true,
              pointStyle: "circle",
              padding: 18,
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleColor: "#f8fafc",
            titleFont: { size: 13, weight: "bold" },
            bodyColor: "#cbd5e1",
            bodyFont: { size: 12 },
            padding: 14,
            borderColor: "rgba(255, 255, 255, 0.12)",
            borderWidth: 1,
            displayColors: true,
            boxWidth: 8,
            boxHeight: 8,
            callbacks: {
              label: (context) => {
                const val = context.parsed.y ?? 0;
                return ` ${context.dataset.label}: ${currencyFormatter(val)}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#64748b",
              font: {
                size: 11,
                family: "'JetBrains Mono', monospace",
              },
              maxRotation: 45,
              minRotation: 0,
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#64748b",
              font: {
                size: 11,
                family: "'JetBrains Mono', monospace",
              },
              callback: (value) => currencyFormatter(Number(value)),
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [props]);

  return (
    <LineChartCard>
      <ChartHeaderRow>
        <HeaderInfoGroup>
          <ChartTitle>
            <FiTrendingUp size={18} color="#3b82f6" />
            시계열 수취 금액 경쟁력 추이
          </ChartTitle>
          <ChartSubtitle>
            시간대별 수집 데이터를 바탕으로 한 주요 경쟁사 환율 및 수취액 변동 그래프
          </ChartSubtitle>
        </HeaderInfoGroup>

        <StatsRow>
          <StatBadge>
            <FiArrowUp size={13} color="#10b981" />
            <span className="stat-label">최고점:</span>
            <span className="stat-val">{currencyFormatter(stats.peak)}</span>
          </StatBadge>
          <StatBadge>
            <FiArrowDown size={13} color="#ef4444" />
            <span className="stat-label">최저점:</span>
            <span className="stat-val">{currencyFormatter(stats.trough)}</span>
          </StatBadge>
          <StatBadge>
            <FiActivity size={13} color="#f59e0b" />
            <span className="stat-label">변동폭:</span>
            <span className="stat-val">{currencyFormatter(stats.spread)}</span>
          </StatBadge>
        </StatsRow>
      </ChartHeaderRow>

      <CanvasWrapper>
        <canvas ref={chartRef} />
      </CanvasWrapper>
    </LineChartCard>
  );
};

export default LineChart;

const LineChartCard = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChartHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChartSubtitle = styled.p`
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12px;

  .stat-label {
    color: #94a3b8;
    font-weight: 600;
  }
  .stat-val {
    color: #f8fafc;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 520px;
  position: relative;
`;
