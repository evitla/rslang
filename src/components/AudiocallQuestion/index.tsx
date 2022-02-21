import React, { useEffect, useRef } from 'react';
import { FILES_URL } from '../../constants/index';
import { AudiocallProps } from '../../types/index';
import { playAudio, getRandomIntExcludingExistingNumbers, shuffleArray } from '../../utils';
import { QuestionWrapper } from './style';
import soundSVG from '../../assets/images/sound.svg';

const AudiocallQuestion: React.FC<AudiocallProps> = ({
  questionAudio,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  useEffect(() => {
    (async function () {
      await playAudio(`${FILES_URL}/${questionAudio.audio}`);
    })();
  }, [questionAudio]);
  const btnRefs = useRef<HTMLButtonElement[]>([]);

  const keyDownHandler = (e: KeyboardEvent) => {
    if ((e as KeyboardEvent).code === 'Digit1') {
      btnRefs.current[0].focus();
    }
    if ((e as KeyboardEvent).code === 'Digit2') {
      btnRefs.current[1].focus();
    }
    if ((e as KeyboardEvent).code === 'Digit3') {
      btnRefs.current[2].focus();
    }
    if ((e as KeyboardEvent).code === 'Digit4') {
      btnRefs.current[3].focus();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
  });
  return (
    <QuestionWrapper className="wrapper">
      <h3 className="question-num">
        Question: {questionNum} / {totalQuestions}
      </h3>
      <button
        className="button play-audio"
        type="button"
        onClick={async () => {
          await playAudio(`${FILES_URL}/${questionAudio.audio}`);
        }}
      >
        <img className="img" src={soundSVG} alt="" />
      </button>
      <div className="answers-wrapper">
        {shuffleArray(answers).map((answer, index) => (
          <div
            key={answer.id + getRandomIntExcludingExistingNumbers(0, 100, 0)}
          >
            <button
              disabled={!!userAnswer}
              value={answer.wordTranslate}
              onClick={callback}
              ref={(el) => (btnRefs.current[index] = el as HTMLButtonElement)}
              className="button"
            >
              <span
                dangerouslySetInnerHTML={{ __html: answer.wordTranslate }}
              ></span>
            </button>
          </div>
        ))}
      </div>
    </QuestionWrapper>
  );
};

export default AudiocallQuestion;
