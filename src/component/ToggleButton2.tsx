import styled from "styled-components";
import eng from "../assets/images/Lang/eng.png";
import ko from "../assets/images/Lang/ko.png";
import { useEffect, useState } from "react";
const ToggleButton2 = () => {
  let langArr = [
    {
      id: 1,
      name: "English",
      locale: "eng",
      src: eng,
    },
    {
      id: 2,
      name: "KOREAN",
      locale: "ko",
      src: ko,
    },
  ];
  const [locale, setLocale] = useState(localStorage.getItem("locale") ?? "ko");
  const [dropDown, setDropDown] = useState({
    hover: false,
    src: langArr.filter((item) => item.locale === locale)[0].src,
    value: langArr.filter((item) => item.locale === locale)[0].name,
  });
  const handleItemClick = (item: any) => {
    setDropDown({
      value: item.name,
      hover: false,
      src: item.src,
    });
    setLocale(item.locale);
    window.location.reload();
  };
  useEffect(() => {
    console.log("locale1:", locale);
    localStorage.setItem("locale", locale);
  }, [locale]);
  const LangSelect = () => {
    return (
      <MenuItem>
        <LangSelectA>
          <LangSelectSpan>
            <img className="flag_image" src={dropDown.src} alt="" />
            <span className="lang_name"> {dropDown.value}</span>
          </LangSelectSpan>
        </LangSelectA>
        <ul className="lang_menu">
          {langArr.map((item) => {
            return (
              <li
                className="item"
                key={item.id}
                onClick={() => handleItemClick(item)}
              >
                <div className="businee_solutions_a">
                  <img className="flag_image" src={item.src} alt="" />
                  <span className="lang_name" defaultValue={item.locale}>
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </MenuItem>
    );
  };
  return <LangSelectWrapper>{LangSelect()}</LangSelectWrapper>;
};
export default ToggleButton2;
const LangSelectWrapper = styled.div`
  padding-left: 100px;
`;
const LangMenu = styled.ul`
  display: none;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;

  float: left;
  list-style: none;
  outline: 0 none;
  line-height: 0;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  .lang_menu {
    display: none;
  }
  &:hover .lang_menu {
    border-radius: 20px;
    flex-direction: column;
    padding: 0;
    display: flex;
    background-color: rgba(255, 255, 255, 100) !important;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    width: 200%;
    height: 100px;
    left: 0;
    box-shadow: 0 6px 28px rgba(0, 0, 0, 0.08);
    position: absolute;
    top: 130%;
    list-style: none outside none;
    margin: 0;
    z-index: 1000;
    color: #191c1f;
  }
  .item {
    cursor: pointer;
    padding: 10px;
    transition: background 0.1s linear;
    list-style: none outside none;
  }
`;
const LangSelectA = styled.a`
  cursor: pointer;
`;
const LangSelectSpan = styled.span`
  position: relative;
  list-style: none outside none;
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  z-index: 10;
  text-transform: none !important;
  &:hover {
    color: black;
  }
`;
