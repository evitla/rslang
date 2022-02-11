import React from 'react';
import { FILES_URL } from '../../constants/index';
import { AudiocallProps } from '../../types/index';
import { playAudiocall } from '../../utils';

const AudiocallQuestion: React.FC<AudiocallProps> = ({
  questionAudio,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <div>
      <p>
        Question: {questionNum} / {totalQuestions}
      </p>
      {playAudiocall(`${FILES_URL}/${questionAudio.audio}`)}
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
