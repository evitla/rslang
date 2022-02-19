import React, { useRef } from 'react';

import useRegistrationForm from '../../hooks/useRegistrationForm';
import useClickOutside from '../../hooks/useClickOutside';
import loginSVG from '../../assets/images/registration.svg';
import {
  EMAIL_VALIDATION,
  MIN_PASSWORD_LENGTH,
  NAME_VALIDATION,
} from '../../constants';
import { ModalWindow, StyledForm } from './style';

const AuthForm = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const authRef = useRef<HTMLFormElement>(null);
  useClickOutside(authRef, setIsOpen);

  const {
    isRegistrationForm,
    addUser,
    loginUser,
    handleIsRegistrationForm,
    register,
    onSubmit,
    formState: { errors },
  } = useRegistrationForm(setIsOpen);

  return (
    <ModalWindow>
      <StyledForm ref={authRef} onSubmit={onSubmit}>
        {isRegistrationForm && (
          <>
            <img className="img" src={loginSVG} alt="" />
            <div className="input-container">
              <input
                id="name"
                className="input"
                type="text"
                placeholder=" "
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                  pattern: {
                    value: NAME_VALIDATION,
                    message: 'Name is not valid',
                  },
                })}
              />
              <div className="cut"></div>
              <label htmlFor="name" className="placeholder">
                Name
              </label>
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </>
        )}
        <div className="input-container">
          <input
            id="Email"
            className="input"
            type="text"
            placeholder=" "
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: EMAIL_VALIDATION,
                message: 'Email is not valid',
              },
            })}
          />
          <div className="cut"></div>
          <label htmlFor="Email" className="placeholder">
            Email
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="input-container">
          <input
            id="Password"
            className="input"
            type="password"
            placeholder=" "
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: 'Password must have at least 8 characters',
              },
            })}
          />
          <div className="cut cut-long"></div>
          <label htmlFor="Password" className="placeholder">
            Password
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <input
          type="submit"
          className="register"
          value={isRegistrationForm ? 'Зарегистрироваться' : 'Войти'}
        />
        {isRegistrationForm ? (
          <div className="hasAcc">
            <span>Есть аккаунт?</span>
            <button className="log-in" onClick={handleIsRegistrationForm}>
              Войти
            </button>
          </div>
        ) : (
          <div className="sign-container">
            <button className="sign-in" onClick={handleIsRegistrationForm}>
              Зарегистрироваться
            </button>
          </div>
        )}
        {addUser.isLoading && <span>add user Loading</span>}
        {addUser.isError && <span>add user Error</span>}
        {loginUser.isLoading && <span>login user Loading</span>}
        {loginUser.isError && <span>login user Error</span>}
      </StyledForm>
    </ModalWindow>
  );
};

export default AuthForm;
