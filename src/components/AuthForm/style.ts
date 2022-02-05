import styled from 'styled-components';

export const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  width: 350px;

  input {
    margin: 6px;
    padding: 6px;
    border: 1px solid black;
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
