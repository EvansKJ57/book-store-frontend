import React from 'react';
import Title from '../components/common/Title';
import styled from 'styled-components';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signup } from '../api/auth';
import { useAlert } from '../hooks/useAlert';

export interface SignupProps {
  email: string;
  name: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = async (data: SignupProps) => {
    await signup(data);
    showAlert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  return (
    <>
      <Title size="large">회원가입 </Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="name"
              {...register('name', { required: true })}
            />
            {errors.name && <p className="error-text">닉네임 입력해주세요</p>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="Password"
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호 입력해주세요</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;
  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }
  input {
    width: 100%;
  }
  button {
    width: 100%;
  }
  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
