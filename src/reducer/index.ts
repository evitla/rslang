import { userReducer } from '../slices/user';
import { statsReducer } from '../slices/stats';
import { sprintGameReducer } from '../slices/sprint';
import { wordReducer } from '../slices/word';

const reducer = {
  userReducer,
  sprintGameReducer,
  statsReducer,
  wordReducer,
};

export default reducer;
