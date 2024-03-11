import styled from "styled-components";

interface DateInputProps {
    defaultTitle: string;
    startDate: string; 
    endDate: string;
}

const DateInput = ({defaultTitle, startDate, endDate}: DateInputProps) => {
    return(
        <DateInputWrapper>
            <DateInputTitle>
               {defaultTitle}
            </DateInputTitle>
            <DateInputContent>
             {startDate}
            </DateInputContent>
            &nbsp;~&nbsp;
            <DateInputContent>
             {endDate}
            </DateInputContent>
        </DateInputWrapper>
    )
}
export default DateInput;

const DateInputWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 50px 0px;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  flex-direction: row;
`;

const DateInputTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const DateInputContent = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 12px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
`