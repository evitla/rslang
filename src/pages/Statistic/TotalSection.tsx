import React from 'react';
import { StatsState } from '../../types';

type Tprops = Pick<StatsState, 'learnedWords' | 'totalRightPercent'>;

export default function TotalSection() {
  return <div>TotalSection</div>;
}
