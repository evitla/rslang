import React, { useEffect } from 'react';
import { FILES_URL } from '../../constants/index';
import { AudiocallProps } from '../../types/index';
import { playAudio } from '../../utils';
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

  return (
    <QuestionWrapper>
      <h3 className="question-num">
        Question: {questionNum} / {totalQuestions}
      </h3>
      <p dangerouslySetInnerHTML={{ __html: questionAudio.word }} />
      <div>
        {answers.map((answer) => (
          <div key={answer.id}>
            <button
              disabled={!!userAnswer}
              value={answer.wordTranslate}
              onClick={callback}
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
