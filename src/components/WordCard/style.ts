import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px 3px rgba(55, 30, 3, 0.2);
  border-radius: 16px;
  position: relative;
`;

export const ImageContainer = styled.div<{ bgImage: string }>`
  width: 300px;
  height: 300px;
  border-radius: 16px 0 0 16px;
  background: url(${({ bgImage }) => bgImage}) no-repeat;
  background-size: cover;
  background-position: center;
`;

export const CardContent = styled.div<{
  isDifficult: boolean;
  isLearned: boolean;
}>`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  ${({ isDifficult }) =>
    isDifficult && 'background-color: rgba(255, 0, 0, 0.25)'};

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
      background-color: red;
    }
  }

  .word-text {
    p + p {
      margin-top: 4px;
    }
  }

  .translation {
    color: ${({ theme }) => theme.colors.secondaryFont}
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
`;

export const StyledCheckbox = styled.label`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  cursor: pointer;
  user-select: none;
  
  input {
    cursor: pointer;
    width: 0;
    height: 0;
    opacity: 0;
    
    &:checked ~ span {
      background-color: #52b788;
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
    background-color: white;
    border: 1.5px solid ${({ theme }) => theme.colors.font};
    border-radius: 4px;
    
    &::after {
      content: "";
      position: absolute;
      display: none;
      left: 10px;
      top: 4px;
      width: 12px;
      height: 20px;
      border: solid white;
      border-width: 0 4px 4px 0;
      transform: rotate(45deg);
    }
  }

  &:hover input ~ span {
    background-color: #52b788;
  }
`;
