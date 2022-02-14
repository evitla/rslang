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
  question: string;
  answer: string;
  correct: boolean;
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
};
export type ScorePropsType = Pick<
  TsprintState,
  'score' | 'history' | 'page' | 'words'
>;
