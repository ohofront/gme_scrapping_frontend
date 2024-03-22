import styled from "styled-components";
import playIcon from "../assets/images/play.png";
type TimerProps = {
  count: number;
};
const Timer = ({ count }: TimerProps) => {
  return (
    <TimerWrapper>
      <img src={playIcon} alt="play_icon" style={{ height: 30 }} />
      <TimerTitle>{count}초 후에 조회됩니다..</TimerTitle>
    </TimerWrapper>
  );
};
export default Timer;

const TimerWrapper = styled.div`
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
  img {
    cursor: pointer;
  }
`;

const TimerTitle = styled.div`
  display: flex;
  position: relative;
  width: 300px;
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
  &:hover {
    background: red;
    color: white;
    transition: 0.5s;
  }
`;
