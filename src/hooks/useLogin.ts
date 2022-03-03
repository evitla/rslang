import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { SIGNIN_URL } from '../constants';
import { loadStats } from '../slices/stats';
import { onLogin } from '../slices/user';
import { TUser } from '../types';
import { getUserStats, loginUser, setLocalStorage } from '../utils';

const useLogin = () => {
  const dispatch = useDispatch();
  const login = useMutation(async (user: TUser) => {
    const data = await loginUser(SIGNIN_URL, user);
    const { userId, token } = data;
    const stats = await getUserStats(userId, token);
    dispatch(onLogin(data));
    dispatch(loadStats(stats));
    setLocalStorage('user', data);
    return data;
  });

  return login;
};

export default useLogin;
