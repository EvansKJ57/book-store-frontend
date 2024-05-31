import React, { useState } from 'react';
import { SignupProps, SignupStyle } from './Signup';
import Title from '../components/common/Title';
import { useNavigate, Link } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';
import { useForm } from 'react-hook-form';
import Button from '../components/common/Button';
import { resetPassword, resetRequest } from '../api/auth';
import InputText from '../components/common/InputText';

const ResetPassword = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [resetRequested, setResetRequested] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = async (data: SignupProps) => {
    if (resetRequested) {
      //초기화
      await resetPassword(data);
      showAlert('비밀번호가 초기화 되었습니다.');
      navigate('/login');
    } else {
      //요청
      await resetRequest(data);
      setResetRequested(true);
    }
  };

  return (
    <>
      <Title size="large">비밀번호 초기화 </Title>
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
          {resetRequested && (
            <fieldset>
              <InputText
                placeholder="Password"
                type="password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
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

export default ResetPassword;
