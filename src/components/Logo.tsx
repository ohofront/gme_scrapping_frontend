import styled from "styled-components";
import bigLogo from "../assets/images/Logo/bigLogo.png";
const Logo = () => {
  return (
    <LogoWrapper>
      <LogoContent>
        <img
          className="logo"
          width={180}
          height={50}
          src={bigLogo}
          alt="logoImage"
        />
      </LogoContent>
    </LogoWrapper>
  );
};
export default Logo;

const LogoWrapper = styled.div`
  margin-right: 25px;
  position: relative;
  cursor: pointer;
  @media screen and (min-width: 1000px) {
    display: flex;
    float: none;
    width: auto;
  }
`;

const LogoContent = styled.a`
  width: auto;
  max-width: none;
  line-height: 22px;
  font-size: 22px;
  letter-spacing: -1px;
  font-family: "Open Sans";
  font-weight: 600;
  align-self: center;
`;
