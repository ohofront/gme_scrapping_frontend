import { useState } from "react";
import { Tab } from "../models/common/tabModel";
import styled from "styled-components";
import Header from "./Header";
import ToggleButton from "./ToggleButton";
import { FiActivity, FiBarChart2 } from "react-icons/fi";
import { FormattedMessage } from "react-intl";

type TabMenuProps = {
  tabData: Tab[];
};

const TabMenu = ({ tabData }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabIcons = [<FiActivity size={17} />, <FiBarChart2 size={17} />];

  return (
    <AppLayout>
      <StickyNavBar>
        <NavLeft>
          <Header />
        </NavLeft>

        <NavCenter>
          <SegmentedNav>
            {tabData.map((tab, index) => (
              <NavTabButton
                key={index}
                $isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                {tabIcons[index] || null}
                <span>{tab.title}</span>
              </NavTabButton>
            ))}
          </SegmentedNav>
        </NavCenter>

        <NavRight>
          <LiveTickerBadge>
            <span className="pulse-dot" style={{ backgroundColor: "#10b981" }} />
            <span className="feed-status">
              <FormattedMessage id="status_connected" />
            </span>
          </LiveTickerBadge>

          <FxQuickTicker>
            <TickerItem>
              <span className="pair">USD/KRW</span>
              <span className="rate">1,374.5</span>
            </TickerItem>
            <TickerDivider />
            <TickerItem>
              <span className="pair">NPR/KRW</span>
              <span className="rate">10.32</span>
            </TickerItem>
          </FxQuickTicker>

          <ToggleButton />
        </NavRight>
      </StickyNavBar>

      <MainDashboardContainer>
        {tabData[activeIndex].content}
      </MainDashboardContainer>
    </AppLayout>
  );
};

export default TabMenu;

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0a0e17;
  color: #f8fafc;
`;

const StickyNavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  height: 68px;
  background: rgba(11, 15, 25, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
`;

const SegmentedNav = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
`;

type TNavButtonProps = { $isActive: boolean };

const NavTabButton = styled.button<TNavButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 7px;
  padding: 8px 18px;
  background-color: ${(props) =>
    props.$isActive ? "#dc2626" : "transparent"};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#94a3b8")};
  font-weight: ${(props) => (props.$isActive ? "700" : "600")};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) =>
    props.$isActive ? "0 2px 10px rgba(220, 38, 38, 0.35)" : "none"};

  &:hover {
    color: #ffffff;
    background-color: ${(props) =>
      props.$isActive ? "#dc2626" : "rgba(255, 255, 255, 0.07)"};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LiveTickerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);

  .feed-status {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #10b981;
    text-transform: uppercase;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const FxQuickTicker = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 6px 12px;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const TickerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;

  .pair {
    color: #94a3b8;
    font-weight: 600;
  }
  .rate {
    color: #f1f5f9;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }
`;

const TickerDivider = styled.div`
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.15);
`;

const MainDashboardContainer = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 28px 32px 60px 32px;
`;
