import { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { FaAngleDown } from "react-icons/fa";
import ClickOutSide from "./ClickOutside";

interface DropDownProps {
  defaultTitle: string;
  optionData: { key: number; value: string }[];
  currentOption: string;
  setCurrentOption: any;
}

const Dropdown = ({
  defaultTitle,
  optionData,
  currentOption,
  setCurrentOption,
}: DropDownProps) => {
  const [isDropdownView, setIsDropdownView] = useState<boolean>(false);

  const handleClickDropdown = () => {
    setIsDropdownView(!isDropdownView);
  };
  const closeDropDown = useCallback(() => {
    setIsDropdownView(false);
  }, [isDropdownView]);

  const handleOnChangeSelectValue = (value: string) => {
    setCurrentOption(value);
  };

  return (
    <DropDownWrapper onClickOutside={closeDropDown}>
      <DropDownTtile>{defaultTitle}</DropDownTtile>
      <DropDownBox onClick={handleClickDropdown}>
        <DropDownLabel>
          {currentOption === "" ? "전체" : currentOption}
          {isDropdownView ? "▲" : "▼"}
        </DropDownLabel>
        <DropDownOptions $show={isDropdownView}>
          {optionData.map((data: any, index: any) => (
            <DropDownOption
              key={index}
              value={currentOption}
              onClick={() => handleOnChangeSelectValue(data.value)}
            >
              {data.value}
            </DropDownOption>
          ))}
        </DropDownOptions>
      </DropDownBox>
    </DropDownWrapper>
  );
};
export default Dropdown;

type TDropDown = { $show: boolean };

const DropDownWrapper = styled(ClickOutSide)`
  display: flex;
  position: relative;
  width: 100%;
  padding: 10px 0px;
  gap: 20px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  flex-direction: row;
`;

const DropDownTtile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const DropDownBox = styled.div`
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
  &:hover {
    background: red;
    color: white;
    transition: 0.5s;
  }
`;
const DropDownLabel = styled.label`
  display: flex;
  font-size: 20px;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
`;

const DropDownButton = styled.button`
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: 300ms ease-out;
`;
const DropDownOptions = styled.ul<TDropDown>`
  position: absolute;
  list-style: none;
  top: 30px;
  left: 0;
  width: 100%;
  overflow: auto;
  max-height: ${(props) => (props.$show ? "none" : "0")};
  height: 600px;
  padding: 0;
  border-radius: 8px;
  background-color: black;
  color: #fefefe;
`;

const DropDownOption = styled.li`
  font-size: 20px;
  padding: 10px 20px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;
