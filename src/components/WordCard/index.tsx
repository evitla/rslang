import React, { useState } from 'react';

import { Card, CardContent, ImageContainer, WordInfo } from './style';
import { playAudio } from '../../utils';
import { TWord } from '../../types';
import { FILES_URL } from '../../constants';
import useSaveUserWord from '../../hooks/useHandleUserWord';

const WordCard = ({
  word,
  isAuthorized,
  isDifficultGroup,
  isDifficult,
  isLearned,
}: {
  word: TWord;
  isAuthorized: boolean;
  isDifficultGroup: boolean;
  isDifficult: boolean;
  isLearned: boolean;
}) => {
  const [isDifficultWord, setIsDifficultWord] = useState(isDifficult);
  const [isLearnedWord, setIsLearnedWord] = useState(isLearned);

  const {
    handleSetWordHard,
    handleSetWordEasy,
    handleSetWordLearned,
    handleSetWordNotLearned,
  } = useSaveUserWord(
    word.id,
    isDifficult,
    isLearned,
    setIsDifficultWord,
    setIsLearnedWord
  );

  return (
    <Card>
      <ImageContainer bgImage={`${FILES_URL}/${word.image}`} />
      <CardContent
        isDifficult={!isDifficultGroup && isDifficultWord}
        isLearned={isLearnedWord}
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
        {isAuthorized && (
          <>
            {isLearnedWord ? (
              <button onClick={handleSetWordNotLearned}>Не изученное</button>
            ) : (
              <button onClick={handleSetWordLearned}>Изученное</button>
            )}
            {!isDifficultWord && (
              <button onClick={handleSetWordHard}>Сложное</button>
            )}
            {isDifficultGroup && (
              <button onClick={handleSetWordEasy}>Не сложное</button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;
