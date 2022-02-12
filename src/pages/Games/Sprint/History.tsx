import React from 'react';
import { Thistory } from '../../../types';

type Tprops = {
  history: Thistory[];
};

export default function History(props: Tprops) {
  const { history } = props;
  return (
    <div>
      <ul>
        {history.map((h, index) => {
          return (
            <li key={index}>
              <span>{h.guessWord}</span> <span>{String(h.result)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
