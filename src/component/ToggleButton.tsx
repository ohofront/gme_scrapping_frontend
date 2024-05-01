import React, { useEffect, useState } from "react";
import styled from "styled-components";

type ToggleType = {
  latestSort: boolean;
};

const ToggleButton = () => {
  const [latestSort, setLatestSort] = useState(true);
  useEffect(() => {
    console.log("latestSort:", latestSort);
  }, [latestSort]);
  const toggleHandler = () => {
    setLatestSort((prev) => !prev);
  };

  return (
    <BtnWrapper>
      <CheckBox type="checkbox" id="toggleBtn" onChange={toggleHandler} />
      <ButtonLabel htmlFor="toggleBtn" latestSort={latestSort} />
    </BtnWrapper>
  );
};

export default ToggleButton;

const BtnWrapper = styled.div`
  display: flex;
  padding-left: 100px;
  z-index: 0;
`;

const CheckBox = styled.input`
  display: none;
`;

const ButtonLabel = styled.label<ToggleType>`
  z-index: 10;
  /* 만들고자 하는 button 의 크기와 색상 */
  width: 12rem;
  height: 3rem;
  border-radius: 2em;
  background-color: white;
  display: flex;

  /* state가 false일 때의 before */
  &::before {
    display: flex;
    position: absolute;
    content: "KOR";
    padding-left: 1em;
    cursor: pointer;
    /* 좌측에 text가 오게하기 위함 */
    justify-content: flex-start;
    align-items: center;
    /* before 요소가 이동할 경로의 길이만큼 width 지정 */
    width: 9rem;
    height: 3rem;
    color: rgb(220, 220, 220);
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    transition: all 0.2s ease-in-out;
  }
  /* state가 false일 때의 after */
  &::after {
    display: flex;
    position: relative;
    content: "ENG";
    width: 6rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    /* false일 때는 우측에 있어야하므로 전체 길이의 반만큼 이동한 상태 */
    left: 6rem;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    border-radius: 2rem;
    background: black;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.16);
    transition: all 0.2s ease-in-out;
  }

  /* state가 true일 때 */
  ${(props) =>
    props.latestSort &&
    `
    &::before {
      padding-right: 1rem;
      content: 'ENG';
       /* 우측에 text가 오도록 하기 위함 */
      justify-content: flex-end;
    };
    &::after {
      content: 'KOR';
      width: 6rem;
      height: 3rem;
       /* true일 때는 좌측에 있어야함 */
      left: 0rem;
    }
  `}
`;
