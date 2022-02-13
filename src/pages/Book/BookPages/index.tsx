import React from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import WordCard from '../../../components/WordCard';
import LoadingCard from '../../../components/WordCard/LoadingCard';
import { LOADING_BLOCKS_COUNT } from '../../../constants';
import { TStore } from '../../../store';
import { TWord } from '../../../types';

const BookPages = () => {
  const {
    words,
    isLoading,
    isError,
    isIdle,
    isDifficultGroup,
  }: {
    words: TWord[];
    isLoading: boolean;
    isError: boolean;
    isIdle: boolean;
    isDifficultGroup: boolean;
  } = useOutletContext();

  const { user } = useSelector((state: TStore) => state.userReducer);

  const { userWords } = useSelector((state: TStore) => state.wordReducer);

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
                isAuthorized={user !== null}
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
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default BookPages;
