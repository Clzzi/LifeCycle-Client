import { pxToRem } from 'src/core/utils/style';
import styled from 'styled-components';

export const Header = () => {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 100vw;
  height: ${pxToRem(56)};
  background-color: ${({ theme }) => theme.colors.Black700};
  padding: 0px 215px;
  display: flex;
  text-align: center;
  align-items: center;
`;

const Logo = styled.div`
  width: 132px;
  height: 38.87px;
  background-image: url('/assets/Logo.svg');
  background-repeat: no-repeat;
`;
