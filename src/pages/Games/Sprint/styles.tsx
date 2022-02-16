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
