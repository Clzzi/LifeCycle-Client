import { css } from '@emotion/react';

export const global = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    display: block;
    font-display: optional;
    font-size: 16px;
    background-color: #28292a;
    color-scheme: dark;
  }

  ol,
  ul {
    list-style: none;
  }
  input {
    outline: none;
    &:focus {
      outline: none;
    }
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif !important;
  }

  a {
    text-decoration: none;
    outline: none;
  }

  a:hover,
  a:active,
  :visited,
  :link {
    text-decoration: none;
  }

  body {
    background-color: #28292a;
    touch-action: auto;
    display: block;
    height: auto;
  }
`;
