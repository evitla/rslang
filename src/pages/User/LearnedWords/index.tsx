import React from 'react';
import { useSelector } from 'react-redux';
import WordCard from '../../../components/WordCard';
import LoadingCard from '../../../components/WordCard/LoadingCard';
import { LOADING_BLOCKS_COUNT } from '../../../constants';
import useFetchUserWords from '../../../hooks/useFetchUserWords';
import { TStore } from '../../../store';
import { defineColor } from '../../../utils';
import { WordCardsContainer } from '../../Book/style';

const LearnedWords = () => {
  const { user } = useSelector((state: TStore) => state.userReducer);

  const learnedWordsQuery = useFetchUserWords(
    user?.userId,
    user?.token,
    (word) => word.optional !== undefined && word.optional.learned
  );

  return (
  <>
    { learnedWordsQuery !== undefined && (
      <WordCardsContainer scrollColor={defineColor(2, 'CC')}>
        {learnedWordsQuery.isLoading || learnedWordsQuery.isIdle ? (
          <LoadingCard count={LOADING_BLOCKS_COUNT} />
        ) : learnedWordsQuery.isError ? (
          <div>Error while fetching</div>
        ) : (
          <>
            {learnedWordsQuery.words.map((word) => (
              <WordCard
                key={word.id}
                word={word}
                groupId={3}
                isAuthorized={true}
                isDifficultGroup={false}
                isDifficult={false}
                isLearned={true}
                isPlayed={undefined}
              />
            ))}
          </>
        )}
      </WordCardsContainer>
    ) }
    </>
  )
};

export default LearnedWords;