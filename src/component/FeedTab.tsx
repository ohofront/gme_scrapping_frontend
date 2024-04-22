import { useEffect, useState } from "react";
import styled from "styled-components";
import { HistoryTab, Tab } from "../models/common/tabModel";
import { lighten } from "polished";

interface FeedTabProps {
  period: string;
  setPeriod: any;
}

const FeedTab = ({ period, setPeriod }: FeedTabProps) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const tabClickHandler = (index: number) => {
    setCurrentTabIndex(index);
  };
  const tabChangeHandler = (value: string) => {
    setPeriod(value);
  };
  const TabData: HistoryTab[] = [
    {
      title: "DAY",
      value: "D",
    },
    {
      title: "WEEK",
      value: "W",
    },
    {
      title: "MONTH",
      value: "M",
    },
    {
      title: "YEAR",
      value: "Y",
    },
  ];
  return (
    <>
      <TabHeader>
        {TabData.map((tab, index) => (
          <TabButton
            value={period}
            key={index}
            $isActive={currentTabIndex === index}
            onClick={() => {
              tabClickHandler(index);
              tabChangeHandler(tab.value);
            }}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>
    </>
  );
};
export default FeedTab;

const TabHeader = styled.ul`
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
`;

type TButtonProps = { $isActive: boolean | undefined };

const TabButton = styled.button<TButtonProps>`
  display: flex;
  border: none;
  border-radius: 10px;
  padding: 20px 20px;
  background-color: ${(props) => (props.$isActive ? "red" : "transparent")};
  color: ${(props) => (props.$isActive ? "white" : "grey")};
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
`;

const TabContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
