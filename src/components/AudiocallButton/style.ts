import styled from 'styled-components';
import { defineColor } from '../../utils';

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
  transition: all 0.3s linear;

  &:hover {
    transform: scale(0.95);
  }
`;
