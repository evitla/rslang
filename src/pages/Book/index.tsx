import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import {
  AUTH_TOTAL_GROUPS,
  PAGES_AT_GROUP,
  PAGE_RANGE_DISPLAYED,
  TOTAL_GROUPS,
} from '../../constants';
import useFetchUserWords from '../../hooks/useFetchUserWords';
import useFetchWords from '../../hooks/useFetchWords';
import { TStore } from '../../store';
import { defineColor, isValidPageAndGroup } from '../../utils';
import { Chapter, StyledBook } from './style';
import { ErrorPage } from '..';
import { setCurGroup, setCurPage } from '../../slices/audiocallBook';
import { useLocation } from 'react-router';
import { ScoreButtonStyle } from '../Games/Sprint/styles';

const Book = () => {
  const { pageId, groupId } = useParams();

  const navigate = useNavigate();

  const [page, group] = [Number(pageId), Number(groupId)];

  const { user } = useSelector((state: TStore) => state.userReducer);

  if (isValidPageAndGroup(page, group, user !== null)) {
    return <ErrorPage />;
  }

  const { userWords } = useSelector((state: TStore) => state.wordReducer);

  const difficultWordsQuery = useFetchUserWords(
    user?.userId,
    user?.token,
    (word) => word.difficulty === 'hard'
  );

  const { words, isLoading, isError } = useFetchWords(group - 1, page - 1);

  const isDifficultGroup = group === AUTH_TOTAL_GROUPS;

  const allLearned =
    !isDifficultGroup &&
    userWords !== null &&
    words !== undefined &&
    words.length !== 0 &&
    userWords.length >= words.length &&
    words.every(
      (word) =>
        userWords.find(
          (w) =>
            w.wordId === word.id &&
            (w.optional?.learned || w.difficulty === 'hard')
        ) !== undefined
    );

  const context = {
    words: isDifficultGroup ? difficultWordsQuery?.words : words,
    isLoading: isDifficultGroup ? difficultWordsQuery?.isLoading : isLoading,
    isError: isDifficultGroup ? difficultWordsQuery?.isError : isError,
    isIdle: difficultWordsQuery?.isIdle,
    userWords,
    isDifficultGroup,
    isAuthorized: user !== null,
    groupId: group,
    pageId: page,
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    if (selected !== page - 1) navigate(`/book/${groupId}/${selected + 1}`);
  };

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleAudioBook = () => {
    const groupAudio = pathname.split('/')[2];
    const pageAudio = pathname.split('/')[3];
    dispatch(setCurGroup(+groupAudio));
    dispatch(setCurPage(+pageAudio));
    navigate('/games/audiocall');
  };

  return (
    <StyledBook allLearned={allLearned} groupColor={defineColor(group - 1)}>
      <div className="chapters">
        <div>
          {Array.from(
            { length: user !== null ? AUTH_TOTAL_GROUPS : TOTAL_GROUPS },
            (_, i) => (
              <Link key={i} to={`/book/${i + 1}/1`}>
                <Chapter color={defineColor(i, 'B3')} active={i === group - 1}>
                  {i + 1}
                </Chapter>
              </Link>
            )
          )}
        </div>
        {!isDifficultGroup && (
          <ScoreButtonStyle>
            <button onClick={handleAudioBook}>Audiocall</button>
          </ScoreButtonStyle>
        )}
      </div>

      {!isDifficultGroup && (
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          previousLabel="<"
          onPageChange={handlePageClick}
          nextLabel=">"
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
          marginPagesDisplayed={1}
          pageCount={PAGES_AT_GROUP}
          forcePage={page - 1}
        />
      )}

      <Outlet context={context} />
    </StyledBook>
  );
};

export default Book;
