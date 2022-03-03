import styled from 'styled-components';

export const StyledHeader = styled.header<{ isMenuOpen: boolean }>`
  padding: 25px 0;
  font-weight: 600;

  .logo {
    display: flex;
    gap: 8px;
    width: 200px;
  }

  .logo-img {
    display: block;
    margin-top: 3px;
    max-width: 40px;
    filter: ${({ theme }) =>
      theme.name === 'light' ? 'none' : 'brightness(0) invert(0.8)'};
  }

  .navigation {
    display: flex;
    align-items: center;
    column-gap: 3.5rem;
  }

  .right-side {
    display: flex;
    column-gap: 2rem;
    align-items: center;
  }

  .theme-btn {
    padding: 0;
    width: 32px;
    height: 32px;

    img {
      width: 100%;
    }
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
    @media screen and (min-width: 1024px) {
      font-size: inherit;
      padding: 0.75em 1.75em;
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
    background: ${({ theme, isMenuOpen }) =>
      isMenuOpen ? '#371e03' : theme.colors.font};
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

export const StyledNav = styled.nav<{ isMenuOpen: boolean }>`
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
    width: 500px;
    background: inherit;
    box-shadow: none;
    position: initial;
    height: auto;
  }
`;

export const StyledUList = styled.ul`
  display: flex;
  padding: 100px 0 0 40px;
  gap: 2rem;
  height: 100%;
  flex-direction: column;
  color: #371e03;

  @media screen and (min-width: 1024px) {
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    color: inherit;
  }
`;

export const StyledListItem = styled.li<{ active: boolean }>`
  position: relative;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 2px;
    width: ${({ active }) => (active ? '100%' : '0')};
    background-color: #371e03;
    transition: width 0.25s;

    @media screen and (min-width: 1024px) {
      background-color: ${({ theme }) => theme.colors.font};
    }
  }
`;
