import React, { ChangeEvent, useState } from 'react';

import { Card, CardContent, ImageContainer, StyledCheckbox } from './style';
import { playAudio } from '../../utils';
import { TWordCard } from '../../types';
import { FILES_URL } from '../../constants';
import useHandleUserWord from '../../hooks/useHandleUserWord';
import { StyledButton } from '../../styles/components';

import soundIcon from '../../assets/images/sound-icon.svg';

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

  const handleSetLearned = async (e: ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    if (target.checked) {
      await handler?.handleSetWordLearned();
    } else {
      await handler?.handleSetWordNotLearned();
    }
  }

  return (
    <Card>
      <ImageContainer bgImage={`${FILES_URL}/${word.image}`} />
      <CardContent
        isDifficult={isAuthorized && !isDifficultGroup && isDifficultWord}
        isLearned={isAuthorized && isLearnedWord}
      >
        <div className="word">
          <span className="title">
            <h2>{word.word}</h2>
            <h2 className="translation">({word.wordTranslate})</h2>
          </span>
          <span className="pronunciation">
            <span>{word.transcription}</span>
            <StyledButton
              onClick={async () => {
                await playAudio(`${FILES_URL}/${word.audio}`);
                await playAudio(`${FILES_URL}/${word.audioMeaning}`);
                await playAudio(`${FILES_URL}/${word.audioExample}`);
              }}
            >
              <img src={soundIcon} alt="" />
            </StyledButton>
          </span>
        </div>
        <div className="word-text">
          <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
          <p className="translation" dangerouslySetInnerHTML={{ __html: word.textMeaningTranslate }} />
        </div>
        <div className="word-text">
          <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
          <p className="translation" dangerouslySetInnerHTML={{ __html: word.textExampleTranslate }} />
        </div>
        {handler !== undefined && (
          <>
            {!isDifficultWord && (
              <button onClick={handler.handleSetWordHard}>Сложное</button>
            )}
            {isDifficultGroup && (
              <button onClick={handler.handleSetWordEasy}>Не сложное</button>
            )}
          </>
        )}
        <StyledCheckbox title='Изучено?'>
          <input type="checkbox" name="learned" checked={isLearnedWord} onChange={handleSetLearned}/>
          <span></span>
        </StyledCheckbox>
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
