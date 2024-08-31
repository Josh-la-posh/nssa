import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Layout, ResetPasswordForm, ResetPasswordSuccess } from '../components';

const Forms = [ResetPasswordForm, ResetPasswordSuccess];

export const ResetPassword = () => {
  const [formPosition, setFormPosition] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParams = Object.fromEntries(searchParams);

  const handleNext = () => {
    if (formPosition < Forms.length) {
      setFormPosition(formPosition + 1);
    }
  };

  useEffect(() => {
    setFormPosition(0);
    if (!queryParams.token) {
      navigate('/auth/forgot-password', { replace: true });
    }
  }, [navigate, queryParams.token]);

  const Form = Forms[formPosition];
  return (
    <Layout>
      <Form onSuccess={handleNext} />
    </Layout>
  );
};
