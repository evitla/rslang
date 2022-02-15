import styled from 'styled-components';

const defineColor = (number: number) => {
  switch (number) {
    case 0:
      return 'rgb(242, 105, 92);';
    case 1:
      return 'rgb(242, 166, 99);';
    case 2:
      return 'rgb(250, 170, 186);';
    case 3:
      return 'rgb(136, 191, 176);';
    case 4:
      return 'rgb(96, 164, 191);';
    case 5:
      return 'rgb(89, 72, 77);';
    default:
      return 'rgb(89, 72, 77);';
  }
};

export const StyledButton = styled.button<{ groupNum: number }>`
  width: 100%;
  max-width: 100px;
  outline: none;
  font-size: 1rem;
  margin: 1rem;
  padding: 0.25rem 1rem;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  background: ${(props) => defineColor(props.groupNum)};
`;
