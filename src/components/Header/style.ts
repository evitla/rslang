import styled from 'styled-components';

export const StyledHeader = styled.header<{ isMenuOpen: boolean }>`
  font-size: 1.125rem;
  padding-top: 25px;
  font-weight: 600;

  .logo {
    font-size: 1.5rem;
  }

  .navigation {
    display: flex;
    align-items: center;
    column-gap: 3.5rem;
  }

  nav {
    width: 320px;
    background: ${({ theme }) => theme.colors.gradient};
    box-shadow: -2px 0px 6px 0px rgba(55, 30, 3, 0.6);
    position: absolute;
    top: 0;
    right: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '-100%')};
    z-index: 10;
    height: 100vh;
    transition: right 0.3s;

    @media screen and (min-width: 1024px) {
      width: 380px;
      background: inherit;
      box-shadow: none;
      position: initial;
      height: auto;
    }
  }

  ul {
    display: flex;
    padding: 100px 0 0 40px;
    gap: 2rem;
    height: 100%;
    flex-direction: column;

    @media screen and (min-width: 1024px) {
      height: auto;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0;
    }
  }

  .right-side {
    display: flex;
    column-gap: 2rem;
  }

  .user {
    width: 38px;
    height: 38px;
    padding: 1px;
    border: 2px solid ${({ theme }) => theme.colors.font};
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.gradient};
  }

  button {
    font-size: 1em;

    @media screen and (min-width: 1024px) {
      font-size: inherit;
      padding: 1em 1.75em;
    }
  }

  .burger {
    display: block;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    z-index: 100;

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }

  .burger-line {
    background: ${({ theme }) => theme.colors.font};;
    width: 2rem;
    height: 2px;
    transition: all 0.3s ease;
  }

  .burger-line + .burger-line {
    margin-top: 6px;
  }

  .line1 {
    transform: ${({ isMenuOpen }) =>
      isMenuOpen ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'};
  }

  .line2 {
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? '0' : '1')};
  }

  .line3 {
    transform: ${({ isMenuOpen }) =>
      isMenuOpen ? 'rotate(45deg) translate(-5px, -6px)' : 'none'};
  }
`;
