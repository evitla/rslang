import { QueryOptions, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  QUERY_KEY_USERS,
  QUERY_KEY_WORDS,
  USERS_URL,
  WORDS_URL,
} from '../constants';
import { onSaveUserWords } from '../slices/word';
import { TStore } from '../store';
import { TUserWord, TWord } from '../types';
import { getAll, getOne } from '../utils';
import useOpenAuthForm from './useOpenAuthForm';

const useFetchUserWords = (
  userId = '',
  token = '',
  filterCallback: (word: TUserWord) => boolean = () => true,
  options: QueryOptions = {}
) => {
  if (!userId || !token) return;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsAuthFormOpen } = useOpenAuthForm();

  const { userWords } = useSelector((state: TStore) => state.wordReducer);

  const { data } = useQuery(QUERY_KEY_USERS, async () => {
    const url = `${USERS_URL}/${userId}/words`;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const words = await getAll(url, navigate, setIsAuthFormOpen, config);
    dispatch(onSaveUserWords(words));

    return words;
  });

  const uw = userWords || (data as TUserWord[]);

  const query = useQuery(
    [QUERY_KEY_WORDS, uw],
    async () => {
      const words = await Promise.all(
        uw
          .filter(filterCallback)
          .map(async (userWord) =>
            getOne(`${WORDS_URL}/${userWord.wordId}`)
          )
      );
      return words;
    },
    { enabled: uw !== undefined, ...options }
  );

  return {
    ...query,
    words: query.data as TWord[],
  };
};

export default useFetchUserWords;
