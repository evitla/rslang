export type TWord = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TAuth = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};
export type TAnswer = {
  questionAudio: string;
  question: string;
  transcript: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

export type AudiocallProps = {
  questionAudio: TWord;
  answers: TWord[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: TAnswer | undefined;
  questionNum: number;
  totalQuestions: number;
};

export type Thistory = {
  guessWord: string;
  result: boolean;
};

export type TsprintState = {
  words: TWord[];
  group: number;
  page: number;
  score: number;
  rightInRow: number;
  status: 'prepare' | 'playing' | 'ended';
  currentWord: string;
  currentWordIndex: number;
  history: Thistory[];
  currentWordId: string;
  maxRightInRow: number;
};

export type ScorePropsType = Pick<
  TsprintState,
  'score' | 'history' | 'page' | 'words'
>;

export type TUserWord = {
  difficulty: 'easy' | 'hard';
  id?: string;
  wordId?: string;
  optional?: UserWordOptions;
};
export type PlayedOptions = {
  rightTimes: number;
  wrongTimes: number;
  rightInRow: number;
};

export type UserWordOptions = {
  learned: boolean;
  isPlayed?: PlayedOptions;
};

export type GetOneWordRes = {
  difficulty: 'easy' | 'hard';
  id: string;
  wordId: string;
  optional: UserWordOptions;
};

export type GetOneExistedWordRes = {
  difficulty: 'easy' | 'hard';
  id: string;
  wordId: string;
  optional: {
    learned: boolean;
    isPlayed: PlayedOptions;
  };
};

export type TBookPageContext = {
  words: TWord[];
  userWords: TUserWord[];
  isLoading: boolean;
  isError: boolean;
  isIdle: boolean;
  isDifficultGroup: boolean;
  isAuthorized: boolean;
  groupId: number;
  pageId: number;
  allLearned: boolean;
};

export type TWordCard = {
  word: TWord;
  groupId: number;
  isAuthorized: boolean;
  isDifficultGroup: boolean;
  isDifficult: boolean;
  isLearned: boolean;
  isPlayed?: PlayedOptions;
  allLearned: boolean;
};
export type GameStatType = {
  newWords: number;
  persentRight: number;
  rightInRow: number;
};

export type AudioCallState = {
  questions: TWord[][];
  number: number;
  userAnswers: TAnswer[];
  score: number;
  gameOver: boolean;
  qurrentQuestion: TWord | null;
  maxRightInRow: number;
};
export type GamseStatsType = {
  newWords: number;
  rightCount: number;
  rightInRow: number;
  tries: number;
};

export type GamseStatsWithDate = {
  [key: string]: GamseStatsType;
};

export type ShortStatsGameType = {
  sprint: GamseStatsWithDate[];
  audiocall: GamseStatsWithDate[];
};
export type UpdateStatsBody = {
  learnedWords: number;
  optional: {
    shortStats: {
      games?: ShortStatsGameType;
      words?: {
        [key: string]: number;
      };
    };
  };
};
export type GetUserStatsResponse = UpdateStatsBody & {
  id: string;
};

export type TAudiocallBook = {
  group: number | null;
  page: number | null;
};
