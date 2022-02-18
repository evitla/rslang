import styled from 'styled-components';

export const IntroSection = styled.section`
  padding: 100px 0 50px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0px 100px 100px -50px ${({ theme }) => theme.colors.bg},
    inset 0px -100px 100px -50px ${({ theme }) => theme.colors.bg};
  text-align: center;

  img {
    position: absolute;
    left: 0;
    top: 0%;
    width: 100%;
    opacity: 0.3;
    z-index: -100;
  }

  h2 {
    font-size: 3.25rem;
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
    width: 65%;
    margin: 1.5rem auto 2rem;
  }

  button {
    font-size: 1.25rem;
  }

  .btn-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }

  .about-team-btn {
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.75em 1.75em;
    border-radius: 32px;
    font-weight: 600;
    color: #fff;
    background: #8b4513;
  }
`;
