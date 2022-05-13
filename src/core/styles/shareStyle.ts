import styled from 'styled-components';
import { handleTagColor } from '../utils/style';
import { loading } from './styleMoudle';

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

export const Loader = styled.div<{
  backgroundColor?: string;
  fontSize?: string;
}>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '13%')};
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: ${loading} 1.4s infinite linear;
  left: 0;
  &::before {
    width: 50%;
    height: 50%;
    background: #ffffff;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &::after {
    background: ${(props) =>
      props.backgroundColor !== 'transparent'
        ? props.backgroundColor
        : props.theme.colors.Black400};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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
