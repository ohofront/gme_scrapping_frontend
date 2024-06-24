import { useEffect, useState } from "react";
import { TbCircleArrowUpFilled } from "react-icons/tb";
import styled from "styled-components";

const ScrollTop = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      window.scrollY > 100 ? setShowButton(true) : setShowButton(false);
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);
  return (
    <>
      {showButton && (
        <ScrollTopButtonDivider>
          <ScrollTopButton onClick={scrollToTop}>
            <TbCircleArrowUpFilled />
          </ScrollTopButton>
        </ScrollTopButtonDivider>
      )}
    </>
  );
};
export default ScrollTop;

const ScrollTopButtonDivider = styled.div`
  bottom: 150px;
  right: 50px;
  display: flex;
  position: fixed;
  z-index: 1000;
  border: none;
  @media (max-width: 690px) {
    .scroll {
      right: 10px;
      bottom: 140px;
    }
  }
`;

const ScrollTopButton = styled.button`
  border: none;
  font-weight: bold;
  font-size: 50px;
  outline: none;
  cursor: pointer;
  color: black;
  background: transparent;
`;
