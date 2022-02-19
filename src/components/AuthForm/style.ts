import styled from 'styled-components';

export const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  width: 350px;
  border-radius: 20px;

  .input-container {
    height: 50px;
    position: relative;
    width: 100%;
  }
  .input {
    background-color: #303245;
    border-radius: 12px;
    border: 0;
    box-sizing: border-box;
    color: #eee;
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
    &t:not(:placeholder-shown) ~ .placeholder {
      transform: translateY(-30px) translateX(10px) scale(0.75);
    }

    &:not(:placeholder-shown) ~ .placeholder {
      color: #808097;
    }

    &:focus ~ .placeholder {
      color: #dc2f55;
    }
  }

  .cut {
    background-color: #15172b;
    border-radius: 10px;
    height: 20px;
    left: 20px;
    position: absolute;
    top: -20px;
    transform: translateY(0);
    transition: transform 200ms;
    width: 55px;
  }

  .cut-short {
    width: 50px;
  }

  .placeholder {
    color: #65657b;
    font-family: sans-serif;
    left: 20px;
    line-height: 14px;
    pointer-events: none;
    position: absolute;
    transform-origin: 0 50%;
    transition: transform 200ms, color 200ms;
    top: 20px;
  }
`;

export const ModalWindow = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.25);
`;
