import styled, { css } from 'styled-components';

export const LevelWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
`;

export const LevelButton = styled.button`
  width: 3rem;
`;

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
  padding: 20px 0;
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
