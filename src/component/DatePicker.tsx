import { registerables } from "chart.js";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

interface DateSelectProps {
  defaultTitle?: string;
  startDate: Date;
  setStartDate: any;
}

const DateSelect = ({
  defaultTitle,
  startDate,
  setStartDate,
}: DateSelectProps) => {
  registerLocale("ko", ko);

  return (
    <DateSelectWrapper>
      <DateSelectTitle>{defaultTitle}</DateSelectTitle>
      <SDateWrapper>
        <SDatePicker
          dateFormat={"yyyy년 MM월 dd일 HH:mm"}
          locale="ko"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
        />
      </SDateWrapper>
    </DateSelectWrapper>
  );
};
export default DateSelect;

const DateSelectWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  flex-direction: row;
`;

const DateSelectTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const SDateWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const SDatePicker = styled(DatePicker)`
  display: flex;
  width: 350px;
  height: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid #dddddd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
`;
