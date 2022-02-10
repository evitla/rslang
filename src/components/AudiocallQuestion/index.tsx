import React from 'react';
import { Question } from '../../pages/Games/Audiocall/api';
import { AnswerObj } from '../../pages/Games/Audiocall/index';

type AudiocallProps = {
  questionAudio: Question[];
  answers: Question[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  questionNum: number;
  totalQuestions: number;
};

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
      <p
        dangerouslySetInnerHTML={{ __html: questionAudio[questionNum].audio }}
      />
      <div>
        {answers.map((answer) => (
          <div key={answer.id}>
            <button
              disabled={!!userAnswer}
              value={answer.word}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer.word }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiocallQuestion;
