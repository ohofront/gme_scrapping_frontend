import { useState } from "react";
import styled from "styled-components";

type DropdownProps = {
  defaultTitle?: string;
  optionData: { key: number; value: string }[];
  currentOption: string;
};
const SelectBox = ({ defaultTitle, optionData, currentOption }: DropdownProps) => {
  const [currentValue, setCurrentValue] = useState(optionData[0].value);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (data: { key: number; value: string }) => {
    setCurrentValue(data.value);
  };

  return (
    <SelectWrapper>
        <SelectTitle>
          {defaultTitle}
        </SelectTitle>
        <SelectedBox onClick={() => setShowOptions((prev) => !prev)}>
          <Label>{currentValue}</Label>
          <SelectOptions show={showOptions}>
            {optionData.map((data, index) => (
              <Option
                key={index}
                value={currentOption}
                onClick={() => handleOnChangeSelectValue(data)}
              >
                {data.value}
              </Option>
            ))}
          </SelectOptions>
        </SelectedBox>
    </SelectWrapper>
  );
};
export default SelectBox;

const SelectWrapper = styled.div`
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

const SelectTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

const SelectedBox = styled.div`
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
  &::before {
    content: "⌵";
    position: absolute;
    top: 0px;
    right: 10px;
    color: #49c181;
    font-size: 30px;
  }
`;
const Label = styled.label`
  font-size: 20px;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
`;
type TSelectionProps = { show: boolean };
const SelectOptions = styled.ul<TSelectionProps>`
  position: absolute;
  list-style: none;
  top: 30px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 200px;
  max-height: ${({ show }) => (show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: black;
  color: #fefefe;
`;
const Option = styled.li`
  font-size: 20px;
  padding: 10px 20px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;
