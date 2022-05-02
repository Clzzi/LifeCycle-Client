import { css, FlattenSimpleInterpolation, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
  opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const ShowLeftToRight = keyframes`
  0% {
  width: 0%;
  }

  100% {
    width: 100%;
  }
`;

export const ellipsisLine = (line: number): FlattenSimpleInterpolation => css`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -ms-word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${line};
`;
