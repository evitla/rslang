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
  height: calc(100% - 63px);
  color: #371e03;
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
      &:focus-visible {
        outline: none;
        box-shadow: 0 0 2px 2px #51a7e8;
        border: 1px solid black;
        color: #1100ff;
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
    margin-bottom: 20px;
  }

  .score-btns {
    display: flex;
    margin-top: 10px;
    gap: 10px;
  }
`;

export const ResultsWrapper = styled.div`
  max-height: 65vh;
  min-height: 400px;
  min-width: 500px;
  border: 3px solid hsla(0, 0%, 100%, 0.7);
  border-radius: 20px;
  padding: 15px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  .img {
    display: block;
    width: 100%;
    max-width: 30px;
  }
  table {
    border-spacing: 0;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    color: #333;
  }
  th {
    padding: 5px 10px;
  }

  td {
    padding: 5px 8px;
    border-collapse: collapse;
    border: none;
    vertical-align: center;
    text-align: center;
  }
  .play-sound {
    cursor: pointer;
    background: none;
    border: none;
    transition: all 0.1s linear;

    &:hover {
      transform: scale(0.9);
    }
    &:active {
      transform: scale(0.8);
    }
  }
`;

export const ScoreButtonStyle = styled.div`
  button {
    display: block;
    padding: 10px 15px;
    border: 1px solid white;
    text-transform: uppercase;
    transition: 0.3s;
    margin-top: 10px;
    cursor: pointer;
    min-width: 140px;

    &:hover {
      color: black;
      background-color: white;
    }
  }
`;
