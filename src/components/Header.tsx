import styled from "styled-components";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isScroll = scrollPosition >= 100;
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });
  return (
    <HeaderOuter>
      <HeaderTop>
        <HeaderContainer>
          <HeaderRow>
            <Logo />
          </HeaderRow>
        </HeaderContainer>
      </HeaderTop>
    </HeaderOuter>
  );
};

const HeaderOuter = styled.div`
  width: 10%;
  top: 0;
  left: 0;
  padding-right: 50px;
  z-index: 9999;
  overflow: visible;
  transition: transform 0.3s ease 0s, background-color 0.3s ease 0s,
    opacity 0.3s ease 0s, box-shadow 0.3s ease 0s, border-color 0.3s ease 0s,
    margin 0.25s ease-out 0s;
`;
const HeaderTop = styled.header`
  position: relative;
  z-index: 9998;
  width: 100%;
`;
const HeaderContainer = styled.div`
  margin: 0px auto;
  position: relative;
  &::before {
    content: " ";
    display: table;
  }
  &::after {
    content: " ";
    display: table;
    clear: both;
  }
  @media screen and (min-width: 1300px) {
    max-width: 1100px;
  }
`;
const HeaderRow = styled.div`
  position: relative;
  padding-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  @media screen and (min-width: 1000px) {
    display: flex;
  }
`;
export default Header;
