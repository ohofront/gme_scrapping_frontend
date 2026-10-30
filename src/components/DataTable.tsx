import { useState, useMemo } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import {
  FiDownload,
  FiSearch,
  FiAward,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from "react-icons/fi";

export type DataTableTypes = {
  items: any[];
  headers?: any;
};

const DataTable = ({ items }: DataTableTypes) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Parse raw items to extract numerical values for calculation
  const parsedItems = useMemo(() => {
    return items.map((item, index) => {
      // Amount might be formatted string like "103,000" or number
      const numAmount =
        typeof item.amount === "number"
          ? item.amount
          : parseInt(String(item.amount).replace(/[^0-9]/g, ""), 10) || 0;
      return {
        ...item,
        originalIndex: index,
        numAmount,
      };
    });
  }, [items]);

  // Find GME amount for comparison
  const gmeItem = parsedItems.find(
    (item) => item.company?.toUpperCase() === "GME"
  );
  const gmeAmount = gmeItem ? gmeItem.numAmount : 0;

  // Filter items by search term
  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return parsedItems;
    return parsedItems.filter((item) =>
      item.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [parsedItems, searchTerm]);

  // Sort by received amount descending to establish rank
  const rankedItems = useMemo(() => {
    return [...filtered].sort((a, b) => b.numAmount - a.numAmount);
  }, [filtered]);

  // CSV Export handler
  const handleExportCSV = () => {
    if (rankedItems.length === 0) return;
    const headers = ["Rank,Country,CurrencyUnit,Company,SendAmount,ReceiveAmount,SpreadVsGME"];
    const rows = rankedItems.map((item, idx) => {
      const spread = item.numAmount - gmeAmount;
      return `${idx + 1},"${item.country}","${item.changeunit}","${item.company}","100,000 KRW","${item.numAmount}","${spread}"`;
    });
    const csvContent = "\uFEFF" + [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `GME_FX_Competitor_Rates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TableCard>
      <TableHeaderToolbar>
        <TitleGroup>
          <TableHeading>
            <FormattedMessage id="liveview" /> - <FormattedMessage id="amount" /> 랭킹
          </TableHeading>
          <ProviderCountBadge>
            총 {rankedItems.length}개사 비교
          </ProviderCountBadge>
        </TitleGroup>

        <ToolbarActions>
          <SearchBoxContainer>
            <FiSearch size={14} color="#94a3b8" />
            <SearchInput
              type="text"
              placeholder="업체명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBoxContainer>

          <ExportBtn onClick={handleExportCSV}>
            <FiDownload size={14} />
            <span>CSV</span>
          </ExportBtn>
        </ToolbarActions>
      </TableHeaderToolbar>

      <TableScrollContainer>
        <StyledTable>
          <thead>
            <tr>
              <Th style={{ width: "60px", textAlign: "center" }}>
                <FormattedMessage id="rank" />
              </Th>
              <Th>
                <FormattedMessage id="competiter" />
              </Th>
              <Th>
                <FormattedMessage id="national" /> / <FormattedMessage id="currency_unit" />
              </Th>
              <Th style={{ textAlign: "right" }}>
                <FormattedMessage id="recv_amount" />
              </Th>
              <Th style={{ textAlign: "right" }}>
                <FormattedMessage id="spread_vs_gme" />
              </Th>
              <Th style={{ width: "100px", textAlign: "center" }}>
                <FormattedMessage id="comp_status" />
              </Th>
            </tr>
          </thead>
          <tbody>
            {rankedItems.map((item, index) => {
              const isGME = item.company?.toUpperCase() === "GME";
              const isTop = index === 0;
              const diffFromGME = item.numAmount - gmeAmount;
              const diffPct =
                gmeAmount > 0
                  ? ((diffFromGME / gmeAmount) * 100).toFixed(1)
                  : "0.0";

              return (
                <Tr key={index} $isGME={isGME}>
                  {/* Rank Column */}
                  <Td style={{ textAlign: "center" }}>
                    <RankBadge $rank={index + 1}>
                      {index === 0 ? <FiAward size={13} /> : `#${index + 1}`}
                    </RankBadge>
                  </Td>

                  {/* Company Name */}
                  <Td>
                    <CompanyCell>
                      <CompanyNameText $isGME={isGME}>
                        {item.company}
                      </CompanyNameText>
                      {isGME && (
                        <GmeTag>
                          <FormattedMessage id="our_service" />
                        </GmeTag>
                      )}
                      {isTop && !isGME && <TopRateTag>BEST OFFER</TopRateTag>}
                    </CompanyCell>
                  </Td>

                  {/* Country & Currency */}
                  <Td>
                    <CountryText>
                      {item.country} <CurrencySubText>({item.changeunit})</CurrencySubText>
                    </CountryText>
                  </Td>

                  {/* Receive Amount */}
                  <Td style={{ textAlign: "right" }}>
                    <AmountText $isTop={isTop}>
                      {typeof item.amount === "number"
                        ? item.amount.toLocaleString()
                        : item.amount}
                    </AmountText>
                  </Td>

                  {/* Spread vs GME */}
                  <Td style={{ textAlign: "right" }}>
                    {isGME ? (
                      <GmeBaseText>
                        <FiMinus size={12} /> 기준 (BASE)
                      </GmeBaseText>
                    ) : (
                      <SpreadText $isPositive={diffFromGME > 0}>
                        {diffFromGME > 0 ? (
                          <>
                            <FiTrendingUp size={12} />
                            +{diffFromGME.toLocaleString()} (+{diffPct}%)
                          </>
                        ) : diffFromGME < 0 ? (
                          <>
                            <FiTrendingDown size={12} />
                            {diffFromGME.toLocaleString()} ({diffPct}%)
                          </>
                        ) : (
                          "0 (동일)"
                        )}
                      </SpreadText>
                    )}
                  </Td>

                  {/* Status Indicator */}
                  <Td style={{ textAlign: "center" }}>
                    {isTop ? (
                      <StatusPill $variant="best">
                        <FormattedMessage id="best_rate" />
                      </StatusPill>
                    ) : diffFromGME > 0 ? (
                      <StatusPill $variant="comp">
                        우위
                      </StatusPill>
                    ) : isGME ? (
                      <StatusPill $variant="gme">
                        자사
                      </StatusPill>
                    ) : (
                      <StatusPill $variant="lag">
                        열세
                      </StatusPill>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </StyledTable>
      </TableScrollContainer>
    </TableCard>
  );
};

export default DataTable;

const TableCard = styled.div`
  background: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TableHeaderToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  gap: 16px;
  flex-wrap: wrap;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TableHeading = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: -0.2px;
`;

const ProviderCountBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.06);
  padding: 3px 8px;
  border-radius: 20px;
`;

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 10px;
  height: 34px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #f8fafc;
  font-size: 12px;
  width: 130px;

  &::placeholder {
    color: #64748b;
  }
`;

const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0 12px;
  height: 34px;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const TableScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px 18px;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
`;

const Tr = styled.tr<{ $isGME?: boolean }>`
  background-color: ${(props) =>
    props.$isGME ? "rgba(220, 38, 38, 0.08)" : "transparent"};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isGME ? "rgba(220, 38, 38, 0.15)" : "rgba(255, 255, 255, 0.04)"};
  }
`;

const Td = styled.td`
  padding: 12px 18px;
  font-size: 13px;
  color: #f1f5f9;
  vertical-align: middle;
  white-space: nowrap;
`;

const RankBadge = styled.div<{ $rank: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  background: ${(props) => {
    switch (props.$rank) {
      case 1:
        return "rgba(245, 158, 11, 0.2)";
      case 2:
        return "rgba(203, 213, 225, 0.2)";
      case 3:
        return "rgba(217, 119, 6, 0.2)";
      default:
        return "rgba(255, 255, 255, 0.04)";
    }
  }};
  color: ${(props) => {
    switch (props.$rank) {
      case 1:
        return "#f59e0b";
      case 2:
        return "#e2e8f0";
      case 3:
        return "#d97706";
      default:
        return "#94a3b8";
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.$rank) {
        case 1:
          return "rgba(245, 158, 11, 0.4)";
        case 2:
          return "rgba(203, 213, 225, 0.4)";
        case 3:
          return "rgba(217, 119, 6, 0.4)";
        default:
          return "rgba(255, 255, 255, 0.06)";
      }
    }};
`;

const CompanyCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CompanyNameText = styled.span<{ $isGME: boolean }>`
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => (props.$isGME ? "#ef4444" : "#f8fafc")};
`;

const GmeTag = styled.span`
  font-size: 9px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  background: #dc2626;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

const TopRateTag = styled.span`
  font-size: 9px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.4);
`;

const CountryText = styled.span`
  color: #cbd5e1;
  font-size: 13px;
`;

const CurrencySubText = styled.span`
  color: #64748b;
  font-size: 11px;
  font-weight: 600;
`;

const AmountText = styled.span<{ $isTop?: boolean }>`
  font-weight: 800;
  font-size: 15px;
  font-family: 'JetBrains Mono', monospace;
  color: ${(props) => (props.$isTop ? "#10b981" : "#f8fafc")};
`;

const SpreadText = styled.div<{ $isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  color: ${(props) => (props.$isPositive ? "#10b981" : "#ef4444")};
`;

const GmeBaseText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
`;

const StatusPill = styled.span<{ $variant: string }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  background: ${(props) => {
    switch (props.$variant) {
      case "best":
        return "rgba(16, 185, 129, 0.15)";
      case "comp":
        return "rgba(59, 130, 246, 0.15)";
      case "gme":
        return "rgba(220, 38, 38, 0.15)";
      case "lag":
      default:
        return "rgba(239, 68, 68, 0.12)";
    }
  }};
  color: ${(props) => {
    switch (props.$variant) {
      case "best":
        return "#10b981";
      case "comp":
        return "#3b82f6";
      case "gme":
        return "#ef4444";
      case "lag":
      default:
        return "#ef4444";
    }
  }};
`;
