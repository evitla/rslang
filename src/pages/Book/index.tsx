import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { AUTH_TOTAL_GROUPS, TOTAL_GROUPS } from '../../constants';
import useFetchUserWords from '../../hooks/useFetchUserWords';
import useFetchWords from '../../hooks/useFetchWords';
import { TStore } from '../../store';

const Book = () => {
  const { pageId, groupId } = useParams();
  if (pageId === undefined) throw new Error('Page not found');
  if (groupId === undefined) throw new Error('Group not found');

  const { user } = useSelector((state: TStore) => state.userReducer);

  const difficultWordsQuery = useFetchUserWords(
    user?.userId,
    user?.token,
    (word) => word.difficulty === 'hard'
  );

  const { words, isLoading, isError, isIdle } = useFetchWords(
    +groupId - 1,
    +pageId - 1
  );

  const isDifficultGroup = +groupId === AUTH_TOTAL_GROUPS;

  const context = {
    words: isDifficultGroup ? difficultWordsQuery?.words : words,
    isLoading: isDifficultGroup ? difficultWordsQuery?.isLoading : isLoading,
    isError: isDifficultGroup ? difficultWordsQuery?.isError : isError,
    isIdle: isDifficultGroup ? difficultWordsQuery?.isIdle : isIdle,
    isDifficultGroup,
    isAuthorized: user !== null,
  };

  return (
    <>
      <h2>Book page</h2>
      {
        // TODO: refactor Page pagination: create component, style
      }
      <div>
        <button>
          <Link to={`/book/${+groupId}/${+pageId - 1}`}>Prev Page</Link>
        </button>
        <button>
          <Link to={`/book/${+groupId}/${+pageId + 1}`}>Next Page</Link>
        </button>
      </div>
      {
        // TODO: refactor Group pagination: create component, style
      }
      <div>
        {Array.from(
          { length: user !== null ? AUTH_TOTAL_GROUPS : TOTAL_GROUPS },
          (_, i) => (
            <button key={i} style={{ marginRight: '8px', padding: '4px' }}>
              <Link to={`/book/${i + 1}/1`}>{i + 1}</Link>
            </button>
          )
        )}
      </div>
      <Outlet context={context} />
    </>
  );
};

export default Book;
