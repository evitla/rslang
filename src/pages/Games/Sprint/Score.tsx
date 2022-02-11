import React from 'react';

type Tprops = {
  score: number;
};

export default function Score(props: Tprops) {
  const { score } = props;
  return (
    <div>
      Score
      <p>{score}</p>
    </div>
  );
}
