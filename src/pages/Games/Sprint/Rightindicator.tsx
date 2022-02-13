import React from 'react';
import styled, { css } from 'styled-components';

const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type StarPropsType = {
  isRight: boolean;
};

const Star = styled.div<StarPropsType>`
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
type PropsType = {
  rightAnswerToBonus: number;
  rightInTheRow: number;
};

export default function Rightindicator(props: PropsType) {
  const { rightAnswerToBonus, rightInTheRow } = props;
  const starsArr = new Array(rightAnswerToBonus).fill('');
  return (
    <IndicatorWrapper>
      {starsArr.map((star, index) => {
        let isRight = false;
        if (index < rightInTheRow) {
          isRight = true;
          return <Star key={index} isRight={isRight}></Star>;
        }
      })}
    </IndicatorWrapper>
  );
}
