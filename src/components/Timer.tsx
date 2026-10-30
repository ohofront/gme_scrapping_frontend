import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { FiClock } from "react-icons/fi";

type TimerProps = {
  count: number;
};

const Timer = ({ count }: TimerProps) => {
  return (
    <TimerWrapper>
      <TimerLabel>
        <FiClock size={13} />
        <FormattedMessage id="scrap_after" />
      </TimerLabel>
      <TimerBox>
        <CountSpan>{count}</CountSpan>
        <UnitSpan>
          <FormattedMessage id="seconds" />
        </UnitSpan>
      </TimerBox>
    </TimerWrapper>
  );
};

export default Timer;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 140px;
`;

const TimerLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
`;

const TimerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CountSpan = styled.span`
  font-size: 16px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
  color: #3b82f6;
`;

const UnitSpan = styled.span`
  font-size: 12px;
  color: #94a3b8;
`;
