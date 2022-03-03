import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { onLogout } from '../slices/user';
import { removeLocalStorage } from '../utils';

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage('user');
    dispatch(onLogout());
    navigate('/');
  };

  return { handleLogout };
};

export default useLogout;
