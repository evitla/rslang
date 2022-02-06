import { useMutation } from 'react-query';
import { SIGNIN_URL } from '../constants';
import { TUser } from '../types';
import { loginUser } from '../utils';

const useLogin = () => {
  const login = useMutation((user: TUser) => loginUser(SIGNIN_URL, user));

  return login;
};

export default useLogin;
