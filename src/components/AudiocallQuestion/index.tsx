import React from 'react';

type AudiocallProps = {
  questionAudio: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: any;
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
      <p dangerouslySetInnerHTML={{ __html: questionAudio }} />
      <div>
        {answers.map((answer) => (
          <div>
            <button disabled={userAnswer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiocallQuestion;
