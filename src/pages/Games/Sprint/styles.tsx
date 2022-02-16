import styled, { css } from 'styled-components';

type StarPropsType = {
  isRight: boolean;
};
export const Star = styled.div<StarPropsType>`
  background: red;
  width: 5rem;
  height: 5rem;
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
    border: 2px solid #fff;
    border-radius: 8px;
    padding: 10px 15px;
    background: #fff;
  }
`;
