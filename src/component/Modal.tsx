import React, { ReactNode, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { darken, lighten } from "polished";

interface Modal {
  title: string;
  confirmText: string;
  className?: string;
  height: number;
  visible: boolean;
  children: ReactNode;
  onBackdropClick?: React.MouseEventHandler<HTMLElement>;
  onClose?: React.MouseEventHandler<HTMLElement>;
  onConfirm: React.MouseEventHandler<HTMLElement>;
}

const Modal = ({
  title,
  confirmText,
  className,
  height,
  visible,
  children,
  onBackdropClick,
  onClose,
  onConfirm,
}: Modal) => {
  const [firstRendering, setFirstRendering] = useState(false);
  const [modalClassName, setModalClassName] = useState("");

  useEffect(() => {
    let timeout: any = null;
    if (visible) {
      setFirstRendering((firstRendering) => firstRendering && false);
      setModalClassName("slide-up");

      timeout = setTimeout(() => {
        setModalClassName("");
        clearTimeout(timeout);
      }, 250);
    } else {
      setModalClassName("slide-down");

      timeout = setTimeout(() => {
        setModalClassName("");
        clearTimeout(timeout);
      }, 250);
    }
  }, [visible]);

  return (
    <DarkBackground
      firstRendering={firstRendering}
      disappear={!visible}
      onClick={(e) => {
        if (visible && onBackdropClick) {
          e.preventDefault();
          onBackdropClick(e);
        } else {
          return undefined;
        }
      }}
    >
      <ModalContainer
        className={`${className} ${modalClassName}`}
        onClick={(e: any) => e.stopPropagation()}
        height={height}
      >
        {title && (
          <ModalContainerHeader>
            <ModalContainerTitle>{title}</ModalContainerTitle>
            {onClose && (
              <ModalCloseBtn onClick={onClose}>
                <IoMdClose
                  style={{ cursor: "pointer", width: 100, height: 30 }}
                />
              </ModalCloseBtn>
            )}
          </ModalContainerHeader>
        )}
        <hr />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <ModalConfirmBtn
            outline={false}
            color="red"
            font="black"
            fontSize={20}
            height="50px"
            width="200px"
            borderRadius="12px"
            onClick={onConfirm}
            disabled={false}
          >
            {confirmText}
          </ModalConfirmBtn>
        </ModalFooter>
      </ModalContainer>
    </DarkBackground>
  );
};

interface DarkBackgroundProps {
  firstRendering: boolean;
  disappear: boolean;
}
interface ModalContainerProps {
  height: number;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; z-index: 9999}
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; z-index: -1; pointer-events: none;}
`;

const slideUp = keyframes`
  from { transform: translateY(12.5rem); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(12.5rem); }
`;

const DarkBackground = styled.div<DarkBackgroundProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  ${({ firstRendering, disappear }) =>
    firstRendering
      ? css`
          opacity: 0;
          z-index: -1;
          pointer-events: none;
        `
      : css`
          animation-duration: 0.25s;
          animation-timing-function: ease-out;
          animation-name: ${fadeIn};
          animation-fill-mode: forwards;
          ${disappear &&
          css`
              animation-name: ${fadeOut}}
            `}
        `}
`;

const ModalContainer = styled.div<ModalContainerProps>`
  ${({ height }) =>
    css`
      height: ${height}px;
    `}
  width: 850px;
  background: white;
  border-radius: 0.625rem;
  color: #333333;
  overflow-y: overlay;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);

  &.slide-up {
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
  }

  &.slide-down {
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideDown};
    animation-fill-mode: forwards;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
  }
`;

const ModalContainerHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  background: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 20px 40px;
`;

const ModalContainerTitle = styled.span`
  color: black;
  width: 500px;
  height: 30px;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* identical to box height */
  display: flex;
  margin: 0;
`;

const ModalCloseBtn = styled.div`
  left: 50px;
  position: relative;
  display: flex;
  outline: none;
  background: none;
  cursor: pointer;
`;

const ModalBody = styled.div`
  padding: 20px 20px;
  font-family: "Pretendard";
  font-weight: bold;
  font-size: 20px;
  display: grid;
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 50px 0px;
`;

const ModalConfirmBtn = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 20px;
  background: red;
  width: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  height: 40px;
  line-height: 20px;
  text-align: center;
`;

export default Modal;
