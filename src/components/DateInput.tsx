import styled from "styled-components";
import { FiClock } from "react-icons/fi";

interface DateInputProps {
  defaultTitle: any;
  searchDate: string;
}

const DateInput = ({ defaultTitle, searchDate }: DateInputProps) => {
  return (
    <DateInputWrapper>
      <DateInputTitle>{defaultTitle}</DateInputTitle>
      <DateInputContent>
        <FiClock size={14} color="#94a3b8" />
        <DateText>{searchDate || "--:--:--"}</DateText>
      </DateInputContent>
    </DateInputWrapper>
  );
};

export default DateInput;

const DateInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 170px;
`;

const DateInputTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: -0.2px;
`;

const DateInputContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DateText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #f8fafc;
  font-family: 'JetBrains Mono', monospace;
`;
