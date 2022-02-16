import styled, { css } from 'styled-components';

type StarPropsType = {
  isRight: boolean;
};
export const Star = styled.div<StarPropsType>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: red;
  ${(props) =>
    props.isRight &&
    css`
      background: green;
    `}
`;
export const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

export const PreviewSprint = styled.div`
  padding-top: 20px;
  .rules {
    text-align: center;
    text-decoration: underline;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    text-align: center;
  }
`;

export const SprintWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background-image: linear-gradient(to right, #de6262, #ffb88c);
  height: calc(100% - 25px);
`;

export const SprintGamePlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .question-wrapper {
    max-width: 600px;
    min-width: 300px;
    border: 2px solid #fff;
    border-radius: 8px;
    padding: 10px 15px;
    background: #fff;
    font-size: 16px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  }

  .time {
    text-align: center;
    font-size: 22px;
    margin-bottom: 15px;
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;

  .word-to-guess {
    font-size: 18px;
  }

  .btn-wrap {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-around;

    button {
      border-radius: 8px;
      padding: 5px 10px;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      cursor: pointer;
      border: 2px solid #d3d3d3;
      font-weight: 600;
      transition: all 0.3s linear;

      &.wrong {
        background: #fff0f5;
      }
      &.right {
        background: #e0ffff;
      }

      &:hover {
        transform: scale(0.95);
      }
    }
  }
`;

export const ScoreTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .score {
    font-size: 20px;
    text-decoration: underline;
  }
`;

export const ResultsWrapper = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
      display: flex;
      gap: 10px;
    }
  }
`;
