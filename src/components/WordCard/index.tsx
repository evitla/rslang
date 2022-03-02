import React, { ChangeEvent, useState } from 'react';

import { Card, CardContent, StyledCheckbox, StyledImage } from './style';
import { changeStatsFromBook, defineColor, playAudio } from '../../utils';
import { TWordCard } from '../../types';
import { FILES_URL } from '../../constants';
import useHandleUserWord from '../../hooks/useHandleUserWord';
import { StyledButton } from '../../styles/components';

import soundIcon from '../../assets/images/sound.svg';
import noteIcon from '../../assets/images/note-icon.svg';
import chatIcon from '../../assets/images/chat-icon.png';

const WordCard = ({
  word,
  groupId,
  isAuthorized,
  isDifficultGroup,
  isDifficult,
  isLearned,
  isPlayed,
  allLearned,
  userId,
  token,
}: TWordCard) => {
  const [isDifficultWord, setIsDifficultWord] = useState(isDifficult);
  const [isLearnedWord, setIsLearnedWord] = useState(isLearned);
  const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(false);

  const handler = useHandleUserWord(
    word.id,
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
    if (userId && token) {
      await changeStatsFromBook(userId, token, target.checked);
    }
  };

  const handlePlayAudio = async () => {
    setIsPlayButtonDisabled(true);
    await playAudio(`${FILES_URL}/${word.audio}`);
    await playAudio(`${FILES_URL}/${word.audioMeaning}`);
    await playAudio(`${FILES_URL}/${word.audioExample}`);
    setIsPlayButtonDisabled(false);
  };

  return (
    <Card allLearned={allLearned} shadowColor={defineColor(groupId - 1)}>
      <StyledImage src={`${FILES_URL}/${word.image}`} alt="" />
      <CardContent
        titleColor={defineColor(groupId - 1)}
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
              onClick={handlePlayAudio}
              disabled={isPlayButtonDisabled}
            >
              <img src={soundIcon} alt="" />
            </StyledButton>
          </span>
        </div>
        <div className="word-text">
          <img className="note-icon" src={noteIcon} alt="" />
          <div>
            <p dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
            <p
              className="translation"
              dangerouslySetInnerHTML={{ __html: word.textMeaningTranslate }}
            />
          </div>
        </div>
        <div className="word-text">
          <img className="chat-icon" src={chatIcon} alt="" />
          <div>
            <p dangerouslySetInnerHTML={{ __html: word.textExample }} />
            <p
              className="translation"
              dangerouslySetInnerHTML={{ __html: word.textExampleTranslate }}
            />
          </div>
        </div>
        {handler !== undefined && (
          <div className="btn-container">
            {!isDifficultWord && (
              <StyledButton
                className="danger-btn"
                onClick={handler.handleSetWordHard}
              >
                Сложное
              </StyledButton>
            )}
            {isDifficultGroup && (
              <StyledButton
                className="success-btn"
                onClick={handler.handleSetWordEasy}
              >
                Не сложное
              </StyledButton>
            )}
            <StyledCheckbox color={defineColor(groupId - 1)}>
              <input
                type="checkbox"
                name="learned"
                checked={isLearnedWord}
                onChange={handleSetLearned}
              />
              <span></span>
              <div className="tooltip">Изучено?</div>
            </StyledCheckbox>
          </div>
        )}
        {isAuthorized && isPlayed && (
          <div className="stats">
            <p>Отвечено верно: {isPlayed.rightTimes}</p>
            <span></span>
            <p>Отвечено неверно: {isPlayed.wrongTimes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCard;
