import { useEffect, useState } from "react";
import styled from "styled-components";
import { HistoryTab, Tab } from "../models/common/tabModel";

interface FeedTabProps {
  period: string;
  setPeriod: any;
}

const FeedTab = ({ period, setPeriod }: FeedTabProps) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const tabClickHandler = (index: number) => {
    setCurrentTabIndex(index);
  };
  const tabChangeHandler = (title: string) => {
    setPeriod(title);
  };
  const TabData: HistoryTab[] = [
    {
      title: "D",
    },
    {
      title: "W",
    },
    {
      title: "M",
    },
    {
      title: "Y",
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
              tabChangeHandler(tab.title);
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
  border: none;
  padding: 30px 30px;
  background-color: ${(props) => (props.$isActive ? "#f0ece3" : "transparent")};
  color: ${(props) => (props.$isActive ? "black" : "grey")};
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
`;

const TabContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
