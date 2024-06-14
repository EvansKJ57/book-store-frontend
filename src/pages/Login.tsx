import React from 'react';
import Title from '../components/common/Title';

import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignupProps, SignupStyle } from './Signup';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = async (data: Omit<SignupProps, 'name'>) => {
    userLogin(data);
  };

  return (
    <>
      <Title size="large">로그인 </Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="Email"
              {...register('email', { required: true })}
              inputMode="email"
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="Password"
              type="password"
              {...register('password', { required: true })}
              inputMode="text"
            />
            {errors.password && (
              <p className="error-text">비밀번호 입력해주세요</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">회원가입</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export default Login;
