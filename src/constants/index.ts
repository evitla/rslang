export const DB_URL = 'https://react-learnwords-6112.herokuapp.com';
export const WORDS_URL = `${DB_URL}/words`;
export const QUERY_KEY_WORDS = 'words';

export const FILES_URL =
  'https://raw.githubusercontent.com/evitla/react-rslang-be/main';

export const START_GROUP = 1;
export const START_PAGE = 1;
export const TOTAL_GROUPS = 6;
export const AUTH_TOTAL_GROUPS = TOTAL_GROUPS + 1;
export const LOADING_BLOCKS_COUNT = 6;
export const PAGES_AT_GROUP = 30;
export const PAGE_RANGE_DISPLAYED = 5;
export const ROUND_TIME = 60;
export const POINTS = 20;
export const BONUS_POINTS = 20;
export const EASY_TO_LEARNED_COUNT = 3;
export const HARD_TO_LEARNED_COUNT = 5;

export const USERS_URL = `${DB_URL}/users`;
export const SIGNIN_URL = `${DB_URL}/signin`;
export const QUERY_KEY_USERS = 'users';
export const NAME_VALIDATION =
  /^[^(0-9~!@#$%*&()_—+=|:;"'`<>,.?\\/\\\s)]{1,30}$/;
export const EMAIL_VALIDATION = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const MIN_PASSWORD_LENGTH = 8;
export const TOTAL_QUESTIONS = 20;
export const TOTAL_ANSWERS = 4;
export const MIN_PAGE = 0;
export const MAX_PAGE = 29;
export const MIN_INDEX_WORD = 0;
export const MAX_INDEX_WORD = 19;
