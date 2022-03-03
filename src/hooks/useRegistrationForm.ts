import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { TUser } from '../types';
import useLogin from './useLogin';
import useCreateUser from './useCreateUser';

const useRegistrationForm = (setIsOpen: (isOpen: boolean) => void) => {
  const navigate = useNavigate();

  const [isRegistrationForm, setIsRegistrationForm] = useState(true);
  const [hideErrorMessage, setHideErrorMessage] = useState(false);

  const handleIsRegistrationForm = () => {
    setIsRegistrationForm(!isRegistrationForm);
    setHideErrorMessage(true);
  };

  const form = useForm<TUser>();

  const { handleSubmit } = form;

  const addUser = useCreateUser();
  const loginUser = useLogin();

  const onSubmit = async (user: TUser) => {
    setHideErrorMessage(false);
    navigate('/');

    if (isRegistrationForm) {
      await addUser.mutateAsync(user);
    }
    await loginUser.mutateAsync(user);

    setIsOpen(false);
  };

  return {
    isRegistrationForm,
    hideErrorMessage,
    handleIsRegistrationForm,
    onSubmit: handleSubmit(onSubmit),
    addUser,
    loginUser,
    ...form,
  };
};

export default useRegistrationForm;
