import styled from 'styled-components';

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.75em 1.75em;
  background: transparent;

  &.gradient-btn {
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    font-weight: 600;
    border-radius: 32px;
  }

  &.danger-btn {
    background: rgba(255, 0, 0, 0.25);
    border-radius: 6px;
  }

  &.success-btn {
    background: rgba(0, 255, 0, 0.25);
    border-radius: 6px;
  }
`;

export default Button;
