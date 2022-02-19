import styled from 'styled-components';

export const IntroSection = styled.section`
  padding: 100px 0 50px;
  position: relative;
  overflow: hidden;
  text-align: center;
  height: calc(100vh - 163px);

  img {
    position: absolute;
    left: 0;
    top: 0%;
    opacity: ${({ theme }) => (theme.name === 'light' ? 0.3 : 0.15)};
    z-index: -100;
  }

  h2 {
    font-size: 4rem;
    font-weight: 800;
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

  .btn-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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
    transition: all 0.3s linear;

    &:hover {
      transform: scale(0.95);
    }
  }
`;
