import styled from "styled-components";
import bigLogo from "../assets/images/Logo/bigLogo.png";

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoContent href="#">
        <LogoImg src={bigLogo} alt="GME Logo" />
        <BrandBadge>
          <BrandTitle>FX INTELLIGENCE</BrandTitle>
          <BrandSubtitle>COMPETITOR RATE RADAR</BrandSubtitle>
        </BrandBadge>
      </LogoContent>
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const LogoContent = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 38px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
`;

const BrandBadge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 12px;
`;

const BrandTitle = styled.span`
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #f8fafc;
  line-height: 1.2;
`;

const BrandSubtitle = styled.span`
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #94a3b8;
  line-height: 1.2;
`;
