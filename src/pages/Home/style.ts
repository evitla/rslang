import styled from 'styled-components';

export const IntroSection = styled.section`
  padding-top: 30px;
  text-align: center;
  height: calc(100vh - 200px);

  img {
    position: absolute;
    left: 0;
    top: 0%;
    opacity: ${({ theme }) => (theme.name === 'light' ? 0.3 : 0.15)};
    z-index: -100;
    height: 100%;
  }

  h2 {
    font-size: clamp(3rem, 100vw / 780 * 56, 4rem);
    font-weight: 800;
  }

  h2 + h2 {
    margin-top: 0.25rem;
  }

  .gradient-title {
    display: inline-block;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryFont};
    font-size: clamp(0.5rem, 100vw / 780 * 14px, 1.15rem);
    line-height: clamp(1.25rem, 100vw / 780 * 24px, 1.75rem);
    width: 50%;
    margin: 1.25rem auto;
  }

  button {
    font-size: 1.125rem;
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

  @media screen and (max-width: 530px) {
    h2 {
      font-size: 2rem;
    }

    button {
      font-size: 16px;
    }
  }
`;
