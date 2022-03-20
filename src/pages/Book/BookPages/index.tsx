import React from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import WordCard from '../../../components/WordCard';
import LoadingCard from '../../../components/WordCard/LoadingCard';
import { LOADING_BLOCKS_COUNT } from '../../../constants';
import { TStore } from '../../../store';
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
    allLearned,
  }: TBookPageContext = useOutletContext();

  const user = useSelector((state: TStore) => state.userReducer.user);

  const token = user ? user.token : null;
  const userId = user ? user.userId : null;

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
                allLearned={allLearned}
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
                token={token}
                userId={userId}
              />
            ))}
          </>
        )}
      </WordCardsContainer>
    </>
  );
};

export default BookPages;
