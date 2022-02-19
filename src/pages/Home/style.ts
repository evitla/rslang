import styled from 'styled-components';

export const IntroSection = styled.section`
  padding: 100px 0 50px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0px 100px 100px -50px ${({ theme }) => theme.colors.bg},
    inset 0px -100px 100px -50px ${({ theme }) => theme.colors.bg};
  text-align: center;
  height: calc(100vh - 163px);

  img {
    position: absolute;
    left: 0;
    top: 0%;
    width: 100%;
    opacity: 0.3;
    z-index: -100;
  }

  h2 {
    font-size: 4rem;
  }

  h2 + h2 {
    margin-top: 0.5rem;
  }

  .gradient-title {
    display: inline-block;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryFont};
    font-size: 1.15rem;
    line-height: 1.75rem;
    width: 50%;
    margin: 1.5rem auto 2.5rem;
  }

  button {
    font-size: 1.25rem;
  }
`;
