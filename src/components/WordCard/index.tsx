import React, { useState } from 'react';

import { Card, CardContent, ImageContainer, WordInfo } from './style';
import { playAudio } from '../../utils';
import { TWord } from '../../types';
import { FILES_URL } from '../../constants';
import useSetWordToDifficult from '../../hooks/useSetWordDifficult';
import useRemoveWordFromDifficult from '../../hooks/useRemoveWordFromDifficult';

const WordCard = ({
  word,
  isAuthorized,
  isDifficultGroup,
  isDifficult,
}: {
  word: TWord;
  isAuthorized: boolean;
  isDifficultGroup: boolean;
  isDifficult: boolean;
}) => {
  const [isDifficultWord, setIsDifficultWord] = useState(isDifficult);

  const { handleSetWordToDifficult } = useSetWordToDifficult(
    word.id,
    setIsDifficultWord
  );

  const { handleRemoveWordFromDifficult } = useRemoveWordFromDifficult(
    word.id,
    setIsDifficultWord
  );

  return (
    <Card>
      <ImageContainer bgImage={`${FILES_URL}/${word.image}`} />
      <CardContent isDifficult={!isDifficultGroup && isDifficultWord}>
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
        {isAuthorized && !isDifficultWord && (
          <button onClick={handleSetWordToDifficult}>Сложное</button>
        )}
        {isAuthorized && isDifficultGroup && (
          <button onClick={handleRemoveWordFromDifficult}>Не сложное</button>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;
