import { css, keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
  opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const showLeftToRight = keyframes`
  0% {
  width: 0%;
  }
  100% {
    width: 100%;
  }
`;

export const loading = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const skeletonAnimation = keyframes`
    0% {
        background-color: rgba(255,255,255,0.1);
    }
    50% {
        background-color: rgba(255,255,255,0.2);
    }
    100% {
        background-color: rgba(255,255,255,0.1);
    }
`;

export const ellipsisLine = (line: number) => css`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -ms-word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${line};
`;

export const dragNone = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
