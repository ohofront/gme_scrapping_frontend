import styled from "styled-components";
import eng from "../assets/images/Lang/eng.png";
import ko from "../assets/images/Lang/ko.png";
import { useState, useRef, useEffect } from "react";
import { FiGlobe, FiChevronDown } from "react-icons/fi";

const ToggleButton = () => {
  const langArr = [
    {
      id: 1,
      name: "English",
      locale: "eng",
      src: eng,
    },
    {
      id: 2,
      name: "한국어",
      locale: "ko",
      src: ko,
    },
  ];

  const [locale, setLocale] = useState<string>(
    localStorage.getItem("locale") ?? "ko"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    langArr.find((item) => item.locale === locale) || langArr[1];

  const handleItemClick = (item: (typeof langArr)[0]) => {
    if (item.locale !== locale) {
      localStorage.setItem("locale", item.locale);
      setLocale(item.locale);
      window.location.reload();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container ref={dropdownRef}>
      <TriggerButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <FiGlobe size={15} color="#94a3b8" />
        <FlagImg src={currentLang.src} alt={currentLang.name} />
        <LangText>{currentLang.name}</LangText>
        <ChevronIcon $isOpen={isOpen}>
          <FiChevronDown size={14} />
        </ChevronIcon>
      </TriggerButton>

      {isOpen && (
        <DropdownMenu>
          {langArr.map((item) => (
            <DropdownItem
              key={item.id}
              $isActive={item.locale === locale}
              onClick={() => handleItemClick(item)}
            >
              <FlagImg src={item.src} alt={item.name} />
              <span>{item.name}</span>
              {item.locale === locale && <ActiveDot />}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Container>
  );
};

export default ToggleButton;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const TriggerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) =>
    props.$isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${(props) => (props.$isOpen ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 8px;
  padding: 8px 12px;
  color: #f1f5f9;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const FlagImg = styled.img`
  width: 18px;
  height: 12px;
  border-radius: 2px;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const LangText = styled.span`
  line-height: 1;
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: #94a3b8;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 130px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
  padding: 6px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: ${(props) => (props.$isActive ? "600" : "500")};
  color: ${(props) => (props.$isActive ? "#f8fafc" : "#cbd5e1")};
  background: ${(props) =>
    props.$isActive ? "rgba(59, 130, 246, 0.2)" : "transparent"};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ActiveDot = styled.div`
  margin-left: auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3b82f6;
`;
