import { reset } from 'styled-reset';
import { skeletonAnimation } from './styleMoudle';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  .animated {
    animation: ${skeletonAnimation} 1.8s infinite ease-in-out;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
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
      min-height: 100vh;
      max-width: 100vw;
    }
`;
