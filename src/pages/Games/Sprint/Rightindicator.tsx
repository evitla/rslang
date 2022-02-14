import React from 'react';
import { IndicatorWrapper, Star } from './styles';

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
