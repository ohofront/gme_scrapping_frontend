import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
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
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  if (!showButton) return null;

  return (
    <ScrollTopWrapper>
      <ScrollTopButton onClick={scrollToTop} title="맨 위로 이동">
        <FiArrowUp size={20} />
      </ScrollTopButton>
    </ScrollTopWrapper>
  );
};

export default ScrollTop;

const ScrollTopWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 999;
`;

const ScrollTopButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #1e293b;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;

  &:hover {
    background: #3b82f6;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  }
`;
