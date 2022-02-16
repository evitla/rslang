import React from 'react';
import { useOutletContext } from 'react-router-dom';
import WordCard from '../../../components/WordCard';
import LoadingCard from '../../../components/WordCard/LoadingCard';
import { LOADING_BLOCKS_COUNT } from '../../../constants';
import { TBookPageContext, TUserWord, TWord } from '../../../types';

const BookPages = () => {
  const {
    words,
    userWords,
    isLoading,
    isError,
    isIdle,
    isDifficultGroup,
    isAuthorized,
  }: TBookPageContext = useOutletContext();

  function detectIsPlayed(arr: TUserWord[], word: TWord) {
    const res = arr.find((w) => w.wordId === word.id);
    if (res) return res.optional?.isPlayed;
    return res;
  }

  return (
    <>
      {
        // TODO: refactor word cards: style, and maybe create separate component
      }
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px 48px',
        }}
      >
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
      </div>
    </>
  );
};

export default BookPages;
