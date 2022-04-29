import styled from 'styled-components';

export const UnderLineText = styled.button`
  width: fit-content;
  text-align: start;
  background-color: transparent;
  border: none;
  cursor: pointer;
  & > a {
    font-size: ${({ theme }) => theme.fonts.font14};
    color: ${({ theme }) => theme.colors.Gray500};
    text-decoration: underline;
    text-underline-position: under;
    &:hover {
      color: ${({ theme }) => theme.colors.Gray500};
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;