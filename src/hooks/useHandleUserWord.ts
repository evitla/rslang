import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../constants';
import { onUpdateUserWord } from '../slices/word';
import { TStore } from '../store';
import { TUserWord } from '../types';
import { create, update } from '../utils';

const useHandleUserWord = (
  wordId: string,
  isDifficult: boolean,
  isLearned: boolean,
  setIsDifficult: (isDifficult: boolean) => void,
  setIsLearned: (isLearned: boolean) => void
) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: TStore) => state.userReducer);

  if (user === null) throw new Error('User not authorized');

  const url = `${USERS_URL}/${user.userId}/words/${wordId}`;
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  const updateWordMutation = useMutation(
    async (difficultWord: TUserWord) => {
      const data =
        isDifficult || isLearned
          ? await update(url, difficultWord, config)
          : await create(url, difficultWord, config);
      return data;
    },
    {
      onSuccess: (newData) => {
        dispatch(onUpdateUserWord(newData as TUserWord));
      },
    }
  );

  const handleSetWordToDifficult = async () => {
    setIsDifficult(true);
    updateWordMutation.mutate({ difficulty: 'hard' });
  };

  const handleSetWordEasy = async () => {
    setIsDifficult(false);
    updateWordMutation.mutate({ difficulty: 'easy' });
  };

  const handleSetWordLearned = async () => {
    setIsLearned(true);
    updateWordMutation.mutate({
      difficulty: isDifficult ? 'hard' : 'easy',
      optional: { learned: true },
    });
  };

  const handleSetWordNotLearned = async () => {
    setIsLearned(false);
    updateWordMutation.mutate({
      difficulty: isDifficult ? 'hard' : 'easy',
      optional: { learned: false },
    });
  };

  return {
    updateWordMutation,
    handleSetWordToDifficult,
    handleSetWordEasy,
    handleSetWordLearned,
    handleSetWordNotLearned,
  };
};

export default useHandleUserWord;
