import { QueryOptions, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
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

const useFetchUserWords = (
  userId = '',
  token = '',
  filterCallback: (word: TUserWord) => boolean = () => true,
  options: QueryOptions = {}
) => {
  if (!userId || !token) return;

  const dispatch = useDispatch();

  const { userWords } = useSelector((state: TStore) => state.wordReducer);

  const { data } = useQuery(QUERY_KEY_USERS, async () => {
    const url = `${USERS_URL}/${userId}/words`;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const words = await getAll<TUserWord>(url, config);
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
            getOne<TWord>(`${WORDS_URL}/${userWord.wordId}`)
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
