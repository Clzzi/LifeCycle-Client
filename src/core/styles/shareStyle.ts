import styled from 'styled-components';
import { handleTagColor } from '../utils/style';

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

export const Tag = styled.div<{
  type: 'COMPANY' | 'STACK' | 'GENERATION';
  height: string;
  fontSize: string;
  maxWidth: string;
  padding: string;
  borderRadius: string;
}>`
  background-color: ${({ type }) => handleTagColor(type)};
  height: ${(props) => props.height};
  line-height: ${(props) => `calc(${props.height} - 1px)`};
  border-radius: ${(props) => props.borderRadius};
  font-size: ${(props) => props.fontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${(props) => props.padding};
  color: ${({ theme }) => theme.colors.White900};
  white-space: nowrap;
  max-width: ${(props) => props.maxWidth};
  overflow: hidden;
`;
