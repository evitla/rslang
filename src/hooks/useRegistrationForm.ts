import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TUser } from '../types';
import useLogin from './useLogin';
import useCreateUser from './useCreateUser';

const useRegistrationForm = (setIsOpen: (isOpen: boolean) => void) => {
  const [isRegistrationForm, setIsRegistrationForm] = useState(true);

  const handleIsRegistrationForm = () =>
    setIsRegistrationForm(!isRegistrationForm);

  const form = useForm<TUser>();

  const { handleSubmit } = form;

  const addUser = useCreateUser();
  const loginUser = useLogin();

  const onSubmit = async (user: TUser) => {
    if (isRegistrationForm) {
      await addUser.mutateAsync(user);
    } else {
      await loginUser.mutateAsync(user);
    }

    setIsOpen(false);
  };

  return {
    isRegistrationForm,
    handleIsRegistrationForm,
    onSubmit: handleSubmit(onSubmit),
    addUser,
    loginUser,
    ...form,
  };
};

export default useRegistrationForm;
