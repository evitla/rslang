import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../constants';
import { onCreateUserWord } from '../slices/word';
import { TStore } from '../store';
import { TUserWord } from '../types';
import { create } from '../utils';

const useSetWordToDifficult = (
  wordId: string,
  setIsDifficult: (isDifficult: boolean) => void
) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: TStore) => state.userReducer);

  if (user === null) throw new Error('User not authorized');

  const url = `${USERS_URL}/${user.userId}/words/${wordId}`;
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };

  const setWordDifficult = useMutation(
    async (difficultWord: TUserWord) => {
      const data = await create(url, difficultWord, config);
      return data;
    },
    {
      onSuccess: (newData) => {
        dispatch(onCreateUserWord(newData as TUserWord));
      },
    }
  );

  const handleSetWordToDifficult = async () => {
    setIsDifficult(true);
    setWordDifficult.mutate({ difficulty: 'hard' });
  };

  return {
    setWordDifficult,
    handleSetWordToDifficult,
  };
};

export default useSetWordToDifficult;
