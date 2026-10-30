import styled from "styled-components";
import { HistoryTab } from "../models/common/tabModel";
import { FormattedMessage } from "react-intl";

interface FeedTabProps {
  period: string;
  setPeriod: (val: string) => void;
}

const FeedTab = ({ period, setPeriod }: FeedTabProps) => {
  const TabData: HistoryTab[] = [
    {
      title: <FormattedMessage id="day" />,
      value: "D",
    },
    {
      title: <FormattedMessage id="week" />,
      value: "W",
    },
    {
      title: <FormattedMessage id="month" />,
      value: "M",
    },
    {
      title: <FormattedMessage id="year" />,
      value: "Y",
    },
  ];

  return (
    <Container>
      <PeriodLabel>분석 주기 (Period)</PeriodLabel>
      <ButtonGroup>
        {TabData.map((tab, index) => {
          const isActive = period === tab.value;
          return (
            <TabButton
              key={index}
              $isActive={isActive}
              onClick={() => setPeriod(tab.value)}
            >
              {tab.title}
            </TabButton>
          );
        })}
      </ButtonGroup>
    </Container>
  );
};

export default FeedTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PeriodLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: -0.2px;
`;

const ButtonGroup = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 3px;
  gap: 3px;
  height: 42px;
  align-items: center;
`;

type TButtonProps = { $isActive: boolean };

const TabButton = styled.button<TButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  padding: 0 14px;
  height: 34px;
  background-color: ${(props) =>
    props.$isActive ? "#3b82f6" : "transparent"};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#94a3b8")};
  font-weight: ${(props) => (props.$isActive ? "700" : "600")};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$isActive ? "0 2px 8px rgba(59, 130, 246, 0.35)" : "none"};

  &:hover {
    color: #ffffff;
    background-color: ${(props) =>
      props.$isActive ? "#3b82f6" : "rgba(255, 255, 255, 0.08)"};
  }
`;
