import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../constants';
import { onRemoveUserWord, onUpdateUserWord } from '../slices/word';
import { TStore } from '../store';
import { TUserWord } from '../types';
import { create, remove, update } from '../utils';

const useHandleUserWord = (
  wordId: string,
  isSaved: boolean,
  setIsDifficult: (isDifficult: boolean) => void = () => {},
  setIsLearned: (isLearned: boolean) => void = () => {}
) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: TStore) => state.userReducer);

  if (user === null) return;

  const url = `${USERS_URL}/${user.userId}/words/${wordId}`;
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  const updateWordMutation = useMutation(
    async (difficultWord: TUserWord) => {
        const data = isSaved
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

  const removeWordMutation = useMutation(async () => remove(url, config), {
    onSuccess: () => {
      dispatch(onRemoveUserWord(wordId));
    },
  });

  const handleSetWordHard = async () => {
    setIsDifficult(true);
    setIsLearned(false);

    updateWordMutation.mutate({
      difficulty: 'hard',
      optional: {
        learned: false,
      }
    });
  };

  const handleSetWordEasy = async () => {
    setIsDifficult(false);
    removeWordMutation.mutate();
  };

  const handleSetWordLearned = async () => {
    setIsLearned(true);
    setIsDifficult(false);

    updateWordMutation.mutate({
      difficulty: 'easy',
      optional: { learned: true },
    });
  };

  const handleSetWordNotLearned = async () => {
    setIsLearned(false);
    removeWordMutation.mutate();
  };

  return {
    updateWordMutation,
    removeWordMutation,
    handleSetWordHard,
    handleSetWordEasy,
    handleSetWordLearned,
    handleSetWordNotLearned,
  };
};

export default useHandleUserWord;
