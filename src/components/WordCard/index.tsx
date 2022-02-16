import React, { useState } from 'react';

import { Card, CardContent, ImageContainer, WordInfo } from './style';
import { playAudio } from '../../utils';
import { TWordCard } from '../../types';
import { FILES_URL } from '../../constants';
import useHandleUserWord from '../../hooks/useHandleUserWord';

const WordCard = ({
  word,
  isAuthorized,
  isDifficultGroup,
  isDifficult,
  isLearned,
  isPlayed,
}: TWordCard) => {
  const [isDifficultWord, setIsDifficultWord] = useState(isDifficult);
  const [isLearnedWord, setIsLearnedWord] = useState(isLearned);

  const handler = useHandleUserWord(
    word.id,
    isDifficultWord || isLearnedWord,
    setIsDifficultWord,
    setIsLearnedWord
  );

  return (
    <Card>
      <ImageContainer bgImage={`${FILES_URL}/${word.image}`} />
      <CardContent
        isDifficult={isAuthorized && !isDifficultGroup && isDifficultWord}
        isLearned={isAuthorized && isLearnedWord}
      >
        <h2>{word.word}</h2>
        <WordInfo>
          <span>{word.wordTranslate}</span>
          <span>{word.transcription}</span>
          <button
            onClick={async () => {
              await playAudio(`${FILES_URL}/${word.audio}`);
              await playAudio(`${FILES_URL}/${word.audioMeaning}`);
              await playAudio(`${FILES_URL}/${word.audioExample}`);
            }}
          >
            play
          </button>
        </WordInfo>
        <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <p dangerouslySetInnerHTML={{ __html: word.textMeaningTranslate }} />
        <p dangerouslySetInnerHTML={{ __html: word.textExampleTranslate }} />
        {handler !== undefined && (
          <>
            {isLearnedWord ? (
              <button onClick={handler.handleSetWordNotLearned}>
                Не изученное
              </button>
            ) : (
              <button onClick={handler.handleSetWordLearned}>Изученное</button>
            )}
            {!isDifficultWord && (
              <button onClick={handler.handleSetWordHard}>Сложное</button>
            )}
            {isDifficultGroup && (
              <button onClick={handler.handleSetWordEasy}>Не сложное</button>
            )}
          </>
        )}
        {isPlayed && (
          <div>
            <p>Отвечено верно {isPlayed.rightTimes}</p>
            <p>Отвечено неверно {isPlayed.wrongTimes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;
