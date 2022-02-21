import React from 'react';
import { useOutletContext } from 'react-router-dom';
import WordCard from '../../../components/WordCard';
import LoadingCard from '../../../components/WordCard/LoadingCard';
import { LOADING_BLOCKS_COUNT } from '../../../constants';
import { TBookPageContext, TUserWord, TWord } from '../../../types';
import { defineColor } from '../../../utils';
import { WordCardsContainer } from '../style';

const BookPages = () => {
  const {
    words,
    userWords,
    isLoading,
    isError,
    isIdle,
    isDifficultGroup,
    isAuthorized,
    groupId,
  }: TBookPageContext = useOutletContext();

  function detectIsPlayed(arr: TUserWord[], word: TWord) {
    const res = arr.find((w) => w.wordId === word.id);
    if (res) return res.optional?.isPlayed;
    return res;
  }

  return (
    <>
      <WordCardsContainer scrollColor={defineColor(groupId - 1, 'CC')}>
        {isLoading || isIdle ? (
          <LoadingCard count={LOADING_BLOCKS_COUNT} />
        ) : isError ? (
          <div>Error while fetching</div>
        ) : (
          <>
            {words.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                groupId={groupId}
                isAuthorized={isAuthorized}
                isDifficultGroup={isDifficultGroup}
                isDifficult={
                  userWords !== null &&
                  userWords.find(
                    (w) => w.wordId === word.id && w.difficulty === 'hard'
                  ) !== undefined
                }
                isLearned={
                  userWords !== null &&
                  userWords.find(
                    (w) => w.wordId === word.id && w.optional?.learned
                  ) !== undefined
                }
                isPlayed={
                  userWords ? detectIsPlayed(userWords, word) : undefined
                }
              />
            ))}
          </>
        )}
      </WordCardsContainer>
    </>
  );
};

export default BookPages;
