import React from 'react';
import { Link, useParams } from 'react-router-dom';
import WordCard from '../../components/WordCard';
import LoadingCard from '../../components/WordCard/LoadingCard';
import { LOADING_BLOCKS_COUNT, TOTAL_GROUPS } from '../../constants';
import useFetchWords from '../../hooks/useFetchWords';

const Book = () => {
  const { pageId, groupId } = useParams();
  if (pageId === undefined) throw new Error('Page not found');
  if (groupId === undefined) throw new Error('Group not found');

  const { words, isLoading, isError } = useFetchWords(
    +groupId - 1,
    +pageId - 1
  );

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
        {Array.from({ length: TOTAL_GROUPS }, (_, i) => (
          <button key={i} style={{ marginRight: '8px', padding: '4px' }}>
            <Link to={`/book/${i + 1}/1`}>{i + 1}</Link>
          </button>
        ))}
      </div>
      {
        // TODO: refactor word cards: style, and maybe create separate component
      }
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px 48px',
        }}
      >
        {isLoading ? (
          <LoadingCard count={LOADING_BLOCKS_COUNT} />
        ) : isError ? (
          <div>Error while fetching</div>
        ) : (
          <>
            {words.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Book;
