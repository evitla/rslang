import React from 'react';
import Rightindicator from './Rightindicator';

export default function Question() {
  return (
    <div>
      <Rightindicator rightAnswerToBonus={2} rightInTheRow={3}></Rightindicator>
      <div>{}</div>
    </div>
  );
}
