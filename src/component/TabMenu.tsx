import { useState } from "react";
import { Tab } from "../models/common/tabModel";
import styled from "styled-components";

type TabMenuProps = {
  tabData: Tab[];
};
const TabMenu = ({ tabData }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <TabHeader>
        {tabData.map((tab, index) => (
          <TabButton
            key={index}
            isActive={activeIndex === index}
            onClick={() => tabClickHandler(index)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>
      <TabContent>{tabData[activeIndex].content}</TabContent>
    </>
  );
};
export default TabMenu;

const TabHeader = styled.ul`
  background-color: #dcdcdc;
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
`;

type TButtonProps = { isActive: boolean };
const TabButton = styled.button<TButtonProps>`
  border: none;
  padding: 30px 30px;
  background-color: ${({ isActive }) => (isActive ? "#f0ece3" : "transparent")};
  color: ${({ isActive }) => (isActive ? "black" : "grey")};
  font-weight: 900;
  font-size: 20px;
  cursor: pointer;
`;

const TabContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
