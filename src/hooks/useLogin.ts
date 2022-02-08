import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

import { SIGNIN_URL } from '../constants';
import { onLogin } from '../slices/user';
import { TUser } from '../types';
import { loginUser, setLocalStorage } from '../utils';

const useLogin = () => {
  const dispatch = useDispatch();
  const login = useMutation(async (user: TUser) => {
    const data = await loginUser(SIGNIN_URL, user);

    dispatch(onLogin(data));
    setLocalStorage('user', data);
    return data;
  });

  return login;
};

export default useLogin;
