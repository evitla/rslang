import React from 'react';
import { AnswerObj } from '../../pages/Games/Audiocall/index';
import { FILES_URL } from '../../constants/index';
import { TWord } from '../../types/index';

type AudiocallProps = {
  questionAudio: TWord;
  answers: TWord[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  questionNum: number;
  totalQuestions: number;
};

const play = (src: string) => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.volume = 0.5;
  audio.loop = false;
  audio.play();

  audio.onended = () => {
    audio.currentTime = 0;
  };
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
      {play(`${FILES_URL}/${questionAudio.audio}`)}
      <p dangerouslySetInnerHTML={{ __html: questionAudio.word }} />
      <div>
        {answers.map((answer, i) => (
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
