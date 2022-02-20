import styled from 'styled-components';

export const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 50px;
  width: 350px;
  border-radius: 20px;

  .img {
    display: block;
    max-width: 100px;
    margin: 0 auto;
    filter: ${({ theme }) =>
      theme.name === 'light' ? 'none' : 'brightness(0) invert(0.6)'};
  }

  .input-container {
    height: 50px;
    position: relative;
    width: 100%;
    margin-top: 45px;
  }
  .input {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 12px;
    border: 2px solid ${({ theme }) => theme.colors.font};
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.font};
    font-size: 18px;
    height: 100%;
    outline: 0;
    padding: 4px 20px 0;
    width: 100%;

    &:focus ~ .cut,
    &:not(:placeholder-shown) ~ .cut {
      transform: translateY(8px);
    }

    &:focus ~ .placeholder,
    &:not(:placeholder-shown) ~ .placeholder {
      transform: translateY(-30px) translateX(10px) scale(0.75);
    }

    &:not(:placeholder-shown) ~ .placeholder {
      color: #808097;
    }

    &:focus ~ .placeholder {
      color: ${({ theme }) => theme.colors.font};
    }
  }

  .cut {
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -22px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 55px;
  }

  .cut-long {
    width: 80px;
  }

  .placeholder {
    color: #65657b;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
  }

  .register {
    width: 100%;
    margin: 35px 0;
    padding: 10px 20px;
    font-weight: 600;
    border: 2px solid ${({ theme }) => theme.colors.font};
    color: inherit;
    outline: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s linear;
    font-size: 1rem;
    font-family: inherit;
    border-radius: 8px;

    &:hover {
      background: ${({ theme }) => theme.colors.font};
      color: ${({ theme }) => theme.colors.bg};
    }
  }

  .hasAcc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .log-in,
  .sign-in {
    border: 2px solid ${({ theme }) => theme.colors.font};
    color: ${({ theme }) => theme.colors.font};
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    background: none;
    transition: all 0.3s linear;
    font-weight: 600;

    &:hover {
      background: ${({ theme }) => theme.colors.gradient};
    }
  }

  .sign-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ModalWindow = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.25);
`;
