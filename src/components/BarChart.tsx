import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { View } from "../models/view/viewModel";
import styled from "styled-components";
import { currencyFormatter } from "../function/currencyFormatter";

Chart.register(...registerables);

interface Props {
  props: View;
}

const BarChart = ({ props }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !props.competitors || props.competitors.length === 0) {
      return;
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy prior chart instance safely
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    // Sort competitors by amount descending for clean visual hierarchy
    const sortedCompetitors = [...props.competitors].sort(
      (a, b) => b.amount - a.amount
    );

    const labels = sortedCompetitors.map((item) => item.company);
    const data = sortedCompetitors.map((item) => item.amount);

    const bgColors = labels.map((name) => {
      const upper = name.toUpperCase();
      if (upper === "GME") return "rgba(220, 38, 38, 0.9)";
      if (upper === "HANPASS") return "rgba(59, 130, 246, 0.75)";
      if (upper === "GMONEY") return "rgba(245, 158, 11, 0.75)";
      if (upper === "COINSHOT") return "rgba(16, 185, 129, 0.75)";
      if (upper === "JRF") return "rgba(139, 92, 246, 0.75)";
      if (upper === "E9PAY") return "rgba(236, 72, 153, 0.75)";
      if (upper === "MOIN") return "rgba(6, 182, 212, 0.75)";
      if (upper === "CROSS") return "rgba(249, 115, 22, 0.75)";
      return "rgba(148, 163, 184, 0.6)";
    });

    const borderColors = labels.map((name) => {
      const upper = name.toUpperCase();
      if (upper === "GME") return "#ef4444";
      if (upper === "HANPASS") return "#3b82f6";
      if (upper === "GMONEY") return "#f59e0b";
      if (upper === "COINSHOT") return "#10b981";
      if (upper === "JRF") return "#8b5cf6";
      if (upper === "E9PAY") return "#ec4899";
      if (upper === "MOIN") return "#06b6d4";
      if (upper === "CROSS") return "#f97316";
      return "#94a3b8";
    });

    const minAmount = Math.min(...data);
    const maxAmount = Math.max(...data);
    const padding = Math.max(1000, Math.round((maxAmount - minAmount) * 0.2));
    const yMin = Math.max(0, minAmount - padding);
    const yMax = maxAmount + padding;

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "수취 금액",
            data: data,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1.5,
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleColor: "#f8fafc",
            titleFont: { size: 13, weight: "bold" },
            bodyColor: "#cbd5e1",
            bodyFont: { size: 12 },
            padding: 12,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const val = context.parsed.y ?? 0;
                return ` 수취액: ${currencyFormatter(val)} ${props.changeunit}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                size: 11,
                weight: "bold",
              },
            },
          },
          y: {
            min: yMin,
            max: yMax,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
            },
            ticks: {
              color: "#64748b",
              font: {
                size: 10,
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
    <ChartCard>
      <ChartHeader>
        <TitleGroup>
          <CountryFlagBadge>
            {props.country === "Nepal" ? "🇳🇵" : props.country === "Vietnam" ? "🇻🇳" : props.country === "Philippines" ? "🇵🇭" : "🌐"}
          </CountryFlagBadge>
          <div>
            <ChartHeading>
              {props.country} <CurrencySubText>({props.changeunit})</CurrencySubText>
            </ChartHeading>
            <ChartSubHeading>경쟁사별 수취금액 비교 차트</ChartSubHeading>
          </div>
        </TitleGroup>
      </ChartHeader>
      <CanvasContainer>
        <canvas ref={chartRef} />
      </CanvasContainer>
    </ChartCard>
  );
};

export default BarChart;

const ChartCard = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 380px;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CountryFlagBadge = styled.span`
  font-size: 20px;
`;

const ChartHeading = styled.h4`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CurrencySubText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
`;

const ChartSubHeading = styled.p`
  margin: 2px 0 0 0;
  font-size: 11px;
  color: #64748b;
`;

const CanvasContainer = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  min-height: 260px;
`;
