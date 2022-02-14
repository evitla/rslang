import React, { useEffect } from 'react';
import { FILES_URL } from '../../constants/index';
import { AudiocallProps } from '../../types/index';
import { playAudio } from '../../utils';

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
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: questionAudio.word }} />
      <div>
        {answers.map((answer) => (
          <div key={answer.id}>
            <button
              disabled={!!userAnswer}
              value={answer.wordTranslate}
              onClick={callback}
            >
              <span
                dangerouslySetInnerHTML={{ __html: answer.wordTranslate }}
              ></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiocallQuestion;
