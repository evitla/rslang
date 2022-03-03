import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../constants';
import { onUpdateUserWord } from '../slices/word';
import { TStore } from '../store';
import { TUserWord } from '../types';
import { create, getOne, update } from '../utils';

const useHandleUserWord = (
  wordId: string,
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

  const createWordMutation = useMutation(
    async (word: TUserWord) => {
      const data = await create(url, word, config);
      return data;
    },
    {
      onSuccess: (newData) => {
        dispatch(onUpdateUserWord(newData as TUserWord));
      },
    }
  );

  const updateWordMutation = useMutation(
    async (word: TUserWord) => {
      const data = await update(url, word, config);
      return data;
    },
    {
      onSuccess: (newData) => {
        dispatch(onUpdateUserWord(newData as TUserWord));
      },
    }
  );

  const handleSetWordHard = async () => {
    setIsDifficult(true);
    setIsLearned(false);

    try {
      const savedWord = await getOne<TUserWord>(url, config);

      updateWordMutation.mutate({
        difficulty: 'hard',
        optional: {
          ...savedWord.optional,
          learned: false,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        createWordMutation.mutate({
          difficulty: 'hard',
          optional: {
            learned: false,
          },
        });
      }
    }
  };

  const handleSetWordEasy = async () => {
    setIsDifficult(false);
    try {
      const savedWord = await getOne<TUserWord>(url, config);

      updateWordMutation.mutate({
        difficulty: 'easy',
        optional: {
          ...savedWord.optional,
          learned:
            savedWord.optional !== undefined && savedWord.optional.learned,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        createWordMutation.mutate({
          difficulty: 'easy',
        });
      }
    }
  };

  const handleSetWordLearned = async () => {
    setIsLearned(true);
    setIsDifficult(false);

    try {
      const savedWord = await getOne<TUserWord>(url, config);

      updateWordMutation.mutate({
        difficulty: 'easy',
        optional: {
          ...savedWord.optional,
          learned: true,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        createWordMutation.mutate({
          difficulty: 'easy',
          optional: {
            learned: true,
          },
        });
      }
    }
  };

  const handleSetWordNotLearned = async () => {
    setIsLearned(false);

    try {
      const savedWord = await getOne<TUserWord>(url, config);

      updateWordMutation.mutate({
        difficulty: savedWord.difficulty,
        optional: {
          ...savedWord.optional,
          learned: false,
        },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        createWordMutation.mutate({
          difficulty: 'easy',
          optional: {
            learned: false,
          },
        });
      }
    }
  };

  return {
    createWordMutation,
    updateWordMutation,
    handleSetWordHard,
    handleSetWordEasy,
    handleSetWordLearned,
    handleSetWordNotLearned,
  };
};

export default useHandleUserWord;
