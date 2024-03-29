import { darken, lighten } from "polished";
import { ReactNode } from "react";
import styled, { css } from "styled-components";

const Button = ({
  outline,
  color,
  font,
  fontSize,
  height,
  width,
  borderRadius,
  onClick,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <StyledButton
      outline={outline}
      color={color}
      font={font}
      fontSize={fontSize}
      height={height}
      width={width}
      borderRadius={borderRadius}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};
export default Button;

type ButtonProps = {
  outline: boolean;
  color: string;
  font: string;
  fontSize: number;
  height: string;
  width: string;
  borderRadius: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> &
    React.MouseEventHandler<HTMLElement>;
  children: ReactNode;
  disabled: boolean;
};
const StyledButton = styled.button<ButtonProps>`
  /* 공통 스타일 */
  display: flex;
  position: relative;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  box-sizing: border-box;
  border: none;
  height: ${({ height }) => height};
  gap: 5px;
  ${({ color, borderRadius, fontSize, outline, width, disabled }) => {
    return css`
      border-radius: ${borderRadius};
      font-size: ${fontSize}px;
      width: ${width};
      transition: ease 0.3s;
      &:hover {
        background: ${lighten(0.1, color)};
        color: white;
      }
      &:active {
        background: ${darken(0.05, color)};
      }
      ${
        outline &&
        css`
          color: ${color};
          background: none;
          border: 1px solid ${color === "white" ? "#EEEEEE" : color};
          &:hover {
            background: ${color};
            color: white;
          }
          &:active {
            background: ${darken(0.05, color)};
            color: white;
          }
        `
      }
      ${
        disabled &&
        css`
          pointer-events: none;
          opacity: 30%;
        `
      }
     }
    `;
  }}
`;
