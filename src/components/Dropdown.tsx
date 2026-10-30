import { useCallback, useState } from "react";
import styled from "styled-components";
import ClickOutSide from "./ClickOutside";
import { FiChevronDown } from "react-icons/fi";

interface DropDownProps {
  defaultTitle: any;
  optionData: { key: number; value: string }[];
  currentOption: string;
  setCurrentOption: (value: string) => void;
  icon?: React.ReactNode;
}

const Dropdown = ({
  defaultTitle,
  optionData,
  currentOption,
  setCurrentOption,
  icon,
}: DropDownProps) => {
  const [isDropdownView, setIsDropdownView] = useState<boolean>(false);

  const handleClickDropdown = () => {
    setIsDropdownView(!isDropdownView);
  };

  const closeDropDown = useCallback(() => {
    setIsDropdownView(false);
  }, []);

  const handleOnChangeSelectValue = (value: string) => {
    setCurrentOption(value);
    setIsDropdownView(false);
  };

  return (
    <DropDownWrapper onClickOutside={closeDropDown}>
      <TitleLabel>{defaultTitle}</TitleLabel>
      <DropDownBox onClick={handleClickDropdown} $isOpen={isDropdownView}>
        {icon && <IconBox>{icon}</IconBox>}
        <DropDownLabel>
          {currentOption === "" ? "전체 (All)" : currentOption}
        </DropDownLabel>
        <ChevronWrapper $isOpen={isDropdownView}>
          <FiChevronDown size={15} />
        </ChevronWrapper>

        {isDropdownView && (
          <DropDownOptions>
            {optionData.map((data, index) => (
              <DropDownOption
                key={index}
                $isSelected={currentOption === data.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnChangeSelectValue(data.value);
                }}
              >
                <span>{data.value === "" ? "전체 (All)" : data.value}</span>
                {currentOption === data.value && <SelectedDot />}
              </DropDownOption>
            ))}
          </DropDownOptions>
        )}
      </DropDownBox>
    </DropDownWrapper>
  );
};

export default Dropdown;

const DropDownWrapper = styled(ClickOutSide)`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 6px;
  min-width: 180px;
`;

const TitleLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  letter-spacing: -0.2px;
`;

const DropDownBox = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 0 14px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid
    ${(props) => (props.$isOpen ? "#3b82f6" : "rgba(255, 255, 255, 0.1)")};
  box-shadow: ${(props) =>
    props.$isOpen ? "0 0 0 2px rgba(59, 130, 246, 0.2)" : "none"};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #94a3b8;
`;

const DropDownLabel = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: #f8fafc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChevronWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: #94a3b8;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
  margin-left: 8px;
`;

const DropDownOptions = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  padding: 6px;
  margin: 0;
  list-style: none;
  border-radius: 8px;
  background-color: #1a2234;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const DropDownOption = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 6px;
  color: ${(props) => (props.$isSelected ? "#ffffff" : "#cbd5e1")};
  background-color: ${(props) =>
    props.$isSelected ? "rgba(59, 130, 246, 0.2)" : "transparent"};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;

const SelectedDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3b82f6;
`;
