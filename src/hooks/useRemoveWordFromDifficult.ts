import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { USERS_URL } from '../constants';
import { onRemoveUserWord } from '../slices/word';
import { TStore } from '../store';
import { remove } from '../utils';

const useRemoveWordFromDifficult = (
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

  const removeWordFromDifficult = useMutation(async () => remove(url, config), {
    onSuccess: () => {
      dispatch(onRemoveUserWord(wordId));
    },
  });

  const handleRemoveWordFromDifficult = () => {
    setIsDifficult(false);
    removeWordFromDifficult.mutate();
  };

  return {
    removeWordFromDifficult,
    handleRemoveWordFromDifficult,
  };
};

export default useRemoveWordFromDifficult;
