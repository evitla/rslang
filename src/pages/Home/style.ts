import styled from 'styled-components';

export const IntroSection = styled.section`
  padding-top: 100px;
  text-align: center;
  height: 100%;
  min-height: 100vh;

  img {
    position: absolute;
    left: 0;
    top: 0%;
    opacity: ${({ theme }) => (theme.name === 'light' ? 0.3 : 0.15)};
    z-index: -100;
    height: 100%;
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

  @media screen and (max-width: 530px) {
    h2 {
      font-size: 2rem;
    }

    button {
      font-size: 16px;
    }
  }
`;

export const Advantages = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  height: 100%;
  min-height: 100vh;

  .bgc-image {
    position: absolute;
    left: 0;
    top: 100%;
    opacity: ${({ theme }) => (theme.name === 'light' ? 0.3 : 0.15)};
    z-index: -100;
    height: 112%;
  }

  h2 {
    font-size: 4rem;
    font-weight: 800;
    text-align: right;
  }

  .advantages-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 400px;
    max-height: 400px;
    min-height: 200px;
    padding: 10px 15px;
    text-align: center;
    background: #fff;
    border-radius: 20px;
    gap: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  h3 {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
`;
