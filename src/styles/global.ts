import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.font};
    font-weight: 500;
    overflow-x: hidden;
    transition: background-color 0.3s linear;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button {
    font-family: inherit;
    &:focus-visible {
      outline: none;
      box-shadow: 0 0 2px 2px #51a7e8;
      border: 1px solid black;
    }
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    flex-grow: 0;
  }

  main {
    flex-grow: 1;
  }

  footer {
    flex-grow: 0;
  }
`;

export default GlobalStyles;
