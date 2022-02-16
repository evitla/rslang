import styled from 'styled-components';

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.75em 1.75em;
  border-radius: 32px;

  &.gradient-btn {
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    font-weight: 600;
  }
`;

export default Button;
