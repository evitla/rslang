import React, { useRef, useState } from 'react';

import useRegistrationForm from '../../hooks/useRegistrationForm';
import useClickOutside from '../../hooks/useClickOutside';
import loginSVG from '../../assets/images/registration.svg';
import {
  EMAIL_VALIDATION,
  MIN_PASSWORD_LENGTH,
  NAME_VALIDATION,
} from '../../constants';
import { ModalWindow, StyledForm } from './style';
import Loader from '../Loader';

const AuthForm = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const authRef = useRef<HTMLFormElement>(null);
  useClickOutside(authRef, setIsOpen);

  const {
    isRegistrationForm,
    hideErrorMessage,
    addUser,
    loginUser,
    handleIsRegistrationForm,
    register,
    onSubmit,
    formState: { errors },
  } = useRegistrationForm(setIsOpen);

  return (
    <ModalWindow>
      <StyledForm
        ref={authRef}
        onSubmit={onSubmit}
        isHidden={addUser.isLoading || loginUser.isLoading}
      >
        <div className="img-container">
          <img className="img" src={loginSVG} alt="" />
          {(addUser.isLoading || loginUser.isLoading) && <Loader />}
        </div>

        {isRegistrationForm && (
          <>
            <div className="input-container">
              <input
                id="name"
                className="input"
                type="text"
                placeholder=" "
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Обязательное поле',
                  },
                  pattern: {
                    value: NAME_VALIDATION,
                    message: 'Невалидное имя',
                  },
                })}
              />
              <div className="cut"></div>
              <label htmlFor="name" className="placeholder">
                Name
              </label>
              {errors.name && (
                <p className="validation-error-msg">{errors.name.message}</p>
              )}
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
                message: 'Обязательное поле',
              },
              pattern: {
                value: EMAIL_VALIDATION,
                message: 'Невалидная почта',
              },
            })}
          />
          <div className="cut"></div>
          <label htmlFor="Email" className="placeholder">
            Email
          </label>
          {errors.email && (
            <p className="validation-error-msg">{errors.email.message}</p>
          )}
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
                message: 'Обязательное поле',
              },
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: 'Пароль должен состоять как минимум из 8 символов',
              },
            })}
          />
          <div className="cut cut-long"></div>
          <label htmlFor="Password" className="placeholder">
            Password
          </label>
          {errors.password && (
            <p className="validation-error-msg">{errors.password.message}</p>
          )}
          {addUser.isError && isRegistrationForm && !hideErrorMessage && (
            <span className="error-msg">
              Кажется Вы уже зарегистрированы у нас. Войдите с помощью своей
              почты
            </span>
          )}
          {loginUser.isError && !isRegistrationForm && !hideErrorMessage && (
            <span className="error-msg">Почта и пароль не совпадают</span>
          )}
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
      </StyledForm>
    </ModalWindow>
  );
};

export default AuthForm;
