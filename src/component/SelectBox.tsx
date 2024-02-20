import { useState } from "react";
import styled from "styled-components";

type DropdownProps = {
  optionData: { key: number; value: string }[];
};
const SelectBox = ({ optionData }: DropdownProps) => {
  const [currentValue, setCurrentValue] = useState(optionData[0].value);
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (data: { key: number; value: string }) => {
    setCurrentValue(data.value);
  };

  return (
    <SelectedBox onClick={() => setShowOptions((prev) => !prev)}>
      <Label>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        {optionData.map((data, index) => (
          <Option
            key={index}
            value={data.value}
            onClick={() => handleOnChangeSelectValue(data)}
          >
            {data.value}
          </Option>
        ))}
      </SelectOptions>
    </SelectedBox>
  );
};
export default SelectBox;

const SelectedBox = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 0px;
    right: 10px;
    color: #49c181;
    font-size: 40px;
  }
`;
const Label = styled.label`
  font-size: 20px;
  margin-left: 10px;
  text-align: center;
`;
type TSelectionProps = { show: boolean };
const SelectOptions = styled.ul<TSelectionProps>`
  position: absolute;
  list-style: none;
  top: 50px;
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
