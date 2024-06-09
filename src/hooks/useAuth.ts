import { SignupProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { login, resetPassword, resetRequest, signup } from '@/api/auth';
import { useState } from 'react';

export const useAuth = () => {
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const userLogin = async (data: Omit<SignupProps, 'name'>) => {
    try {
      const result = await login(data);
      storeLogin(result.acToken);
      showAlert('로그인 완료되었습니다.');
      navigate('/');
    } catch (error) {
      showAlert('로그인이 실패했습니다.');
    }
  };

  const userSignup = async (data: SignupProps) => {
    await signup(data);
    showAlert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  const userResetPassword = async (data: SignupProps) => {
    await resetPassword(data);
    showAlert('비밀번호가 초기화 되었습니다.');
    navigate('/login');
  };

  const [resetRequested, setResetRequested] = useState(false);
  const userResetRequest = async (data: SignupProps) => {
    await resetRequest(data);
    setResetRequested(true);
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
