import styled from "styled-components";
import { FaPlay, FaStop } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

type TimerProps = {
  count: number;
};
const Timer = ({ count }: TimerProps) => {
  const START_DURATION = 60;
  const [isStop, setIsStop] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSeconds, setSeconds] = useState(count);
  const [duration, setDuration] = useState(START_DURATION);
  const locale = localStorage.getItem("locale") ?? "ko";

  const resetHandler = () => {
    setSeconds(count);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DURATION);
  };

  const startHandler = () => {
    setDuration(count);
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };

  const resumeHandler = () => {
    let newDuration = currentSeconds;
    setDuration(newDuration);
    setIsRunning(true);
    setIsStop(false);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer = duration;
      var seconds: number = 0;
      const interval = setInterval(function () {
        if (--timer <= 0) {
          resetHandler();
        } else {
          seconds = timer;
          seconds = seconds < 10 ? 0 + seconds : seconds;
          setSeconds(seconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <TimerWrapper>
      {/* {!isRunning && !isStop && (
        <FaPlay
          onClick={startHandler}
          color="red"
          style={{ cursor: "pointer", width: 100, height: 30 }}
        />
      )}
      {isRunning && (
        <FaStop
          onClick={stopHandler}
          color="red"
          style={{ cursor: "pointer", width: 100, height: 30 }}
        />
      )}
      {isStop && (
        <FaPlay
          onClick={resumeHandler}
          color="red"
          style={{ cursor: "pointer", width: 100, height: 30 }}
        />
      )} */}
      {/* <img src={playIcon} alt="play_icon" style={{ height: 30 }} /> */}
      <TimerTitle>
        {locale === "ko" ? (
          <>
            {count}
            <FormattedMessage id="scrap_after_second" />
          </>
        ) : (
          <>
            <FormattedMessage id="scrap_after" />
            &nbsp;
            {count}
            &nbsp;
            <FormattedMessage id="seconds" />
          </>
        )}
      </TimerTitle>
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
