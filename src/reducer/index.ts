import { userReducer } from '../slices/user';
import { statsReducer } from '../slices/stats';
import { sprintGameReducer } from '../slices/sprint';
import { wordReducer } from '../slices/word';
import { audioGameReducer } from '../slices/audiocall';
import { audiogameBookReducer } from '../slices/audiocallBook';

const reducer = {
  userReducer,
  sprintGameReducer,
  statsReducer,
  wordReducer,
  audioGameReducer,
  audiogameBookReducer,
};

export default reducer;
