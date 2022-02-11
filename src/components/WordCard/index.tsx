import React from 'react';

import { Card, CardContent, ImageContainer, WordInfo } from './style';
import { playAudio } from '../../utils';
import { TWord } from '../../types';
import { FILES_URL } from '../../constants';

const WordCard = ({ word }: { word: TWord }) => {
  return (
    <Card>
      <ImageContainer bgImage={`${FILES_URL}/${word.image}`} />
      <CardContent>
        <h2>{word.word}</h2>
        <WordInfo>
          <span>{word.wordTranslate}</span>
          <span>{word.transcription}</span>
          <button
            onClick={() => {
              playAudio(`${FILES_URL}/${word.audio}`);
              playAudio(`${FILES_URL}/${word.audioMeaning}`);
              playAudio(`${FILES_URL}/${word.audioExample}`);
            }}
          >
            play
          </button>
        </WordInfo>
        <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
        <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
        <p dangerouslySetInnerHTML={{ __html: word.textMeaningTranslate }} />
        <p dangerouslySetInnerHTML={{ __html: word.textExampleTranslate }} />
      </CardContent>
    </Card>
  );
};

export default WordCard;
