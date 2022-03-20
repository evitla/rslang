import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ROUND_TIME } from '../../../constants';
import { setStatus } from '../../../slices/sprint';

export default function Timer() {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(ROUND_TIME);
  const [idInt, setidInt] = useState<NodeJS.Timer | null>(null);
  const createTimer = () => {
    const id = setInterval(() => {
      setTimer((prevstate) => prevstate - 1);
    }, 1000);
    return id;
  };

  useEffect(() => {
    if (!idInt) {
      const id = createTimer();
      setidInt(id);
    }
    if (timer === 0 && idInt) {
      clearInterval(idInt);
      setidInt(null);
      dispatch(setStatus('ended'));
    }
  }, [timer]);
  return (
    <>
      <p className="time">{timer}</p>
    </>
  );
}
