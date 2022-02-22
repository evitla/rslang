import styled from 'styled-components';
import { defineColor } from '../../utils';

export const Card = styled.div<{ allLearned: boolean; shadowColor: string }>`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 3px
    ${({ theme, allLearned, shadowColor }) =>
    allLearned ? shadowColor + '70' : theme.colors.font + '30'};
  border-radius: 16px;
  position: relative;
`;

export const StyledImage = styled.img`
  width: 30%;
  height: inherit;
  border-radius: 16px 0 0 16px;
`;

export const CardContent = styled.div<{
  isDifficult: boolean;
  isLearned: boolean;
  titleColor: string;
}>`
  width: 70%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-radius: 0 16px 16px 0;
  ${({ isDifficult }) =>
    isDifficult && `background-color: ${defineColor(6, '50')}`};

  .word {
    position: relative;
    margin-left: 12px;

    span + span {
      margin-top: 0.5rem;
    }

    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      left: -12px;
      width: 5px;
      height: 100%;
      background-color: ${({ titleColor }) => titleColor};
    }
  }

  img {
    filter: ${({ theme }) =>
      theme.name === 'light' ? 'none' : 'brightness(0) invert(0.6)'};
  }

  .word-text {
    display: flex;
    align-items: center;

    .note-icon {
      width: 28px;
      opacity: 0.8;
      margin-right: 8px;
    }

    .chat-icon {
      width: 24px;
      opacity: 0.8;
      margin-right: 12px;
    }

    p + p {
      margin-top: 4px;
    }
  }

  .translation {
    color: ${({ theme }) => theme.colors.secondaryFont};
  }

  .title {
    display: flex;
    column-gap: 0.75rem;
  }

  .pronunciation {
    display: flex;
    column-gap: 0.75rem;

    span {
      font-size: 1.25rem;
    }

    button {
      padding: 0;
    }

    img {
      width: 26px;
      height: 26px;
    }
  }

  .btn-container {
    height: 40px;
  }

  .danger-btn,
  .success-btn {
    width: fit-content;
    font-size: inherit;
    font-weight: 500;
  }

  .danger-btn {
    background: ${() => defineColor(6, '73')};
  }

  .success-btn {
    background: ${() => defineColor(2, 'B3')};
  }

  .stats {
    width: 30%;
    display: flex;
    justify-content: flex-end;
    column-gap: 0.5rem;
    position: absolute;
    right: 2rem;
    bottom: 1.5rem;

    span {
      width: 2px;
      background-color: ${({ theme }) => theme.colors.font};
      opacity: 0.7;
    }
  }
`;

export const StyledCheckbox = styled.label<{ color: string }>`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  cursor: pointer;
  user-select: none;
  width: 0;

  .tooltip {
    position: absolute;
    top: 0;
    right: 10px;
    opacity: 0;
    background-color: ${({ color }) => color};
    color: ${({ theme }) => theme.colors.bg};
    padding: 6px 3px;
    border-radius: 4px;
    transition: all 0.5s;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent ${({ color }) => color};
    }
  }

  &:hover .tooltip {
    opacity: 1;
    transform: translateX(-30px);
  }

  input {
    cursor: pointer;
    width: 0;
    height: 0;
    opacity: 0;

    &:checked ~ span {
      background-color: ${({ color }) => color};
      border: none;

      &::after {
        display: block;
      }
    }
  }

  span {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
    background-color: ${({ theme }) => theme.colors.bg};
    border: 1.5px solid ${({ theme }) => theme.colors.font};
    border-radius: 4px;

    &::after {
      content: '';
      position: absolute;
      display: none;
      left: 10px;
      top: 4px;
      width: 12px;
      height: 20px;
      border: solid ${({ theme }) => theme.colors.bg};
      border-width: 0 4px 4px 0;
      transform: rotate(45deg);
    }
  }

  &:hover input ~ span {
    background-color: ${({ color }) => color};
  }
`;
