import styled from "styled-components";
import Logo from "./Logo";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;
