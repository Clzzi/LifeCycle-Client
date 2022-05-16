import { reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    background-color: #28292A;
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
      font-family:  'Noto Sans KR', sans-serif !important;
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
      background-color: #28292A;
      width: 100%;
      height: 100vh;
      min-height: 100vh;
      max-width: 100vw;
    }
`;
