import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { LogoLoader } from '@/components/Elements';
import { useAuth } from '@/lib/auth';
import storage from '@/utils/storage';

import { useConfirmEmailViaToken } from '../api';
import { ConfirmEmailForm, Layout } from '../components';

export const ConfirmEmail = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const { token } = queryParams;
  const [loading, setLoading] = useState(true);
  const [errorVerifyingEmailToken, setErrorVerifyingEmailToken] = useState(false);

  const { user } = useAuth();

  const confirmEmailViaToken = useConfirmEmailViaToken();

  const handleRedirect = useCallback(() => {
    navigate(storage.session.getValue('redirect-path') || '/', { replace: true });
    storage.session.clearValue('redirect-path');
  }, [navigate]);

  const handleSubmit = () => {
    handleRedirect();
  };

  const handleResetErrorVerifyingEmailToken = () => {
    if (errorVerifyingEmailToken === true) {
      setErrorVerifyingEmailToken(false);
    }
  };

  useEffect(() => {
    if (token) {
      confirmEmailViaToken.mutate(token, {
        onSuccess() {
          setErrorVerifyingEmailToken(false);
          handleSubmit();
        },
        onSettled() {
          setLoading(false);
        },
        onError() {
          setErrorVerifyingEmailToken(true);
        },
      });
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (loading) {
    return <LogoLoader text={'Verifying your email, please wait...'} />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user && user?.emailConfirm) {
    // notification.show({ message: 'Email has been verified already', type: 'success' });
    return <Navigate to={storage.session.getValue('redirect-path') || '/auth/login'} replace />;
  }
  return (
    <>
      <Layout animateCheckYourEmailSvg={true}>
        <ConfirmEmailForm
          onSuccess={handleSubmit}
          errorVerifyingEmailToken={errorVerifyingEmailToken}
          resetErrorVerifyingEmailToken={handleResetErrorVerifyingEmailToken}
        />
      </Layout>
    </>
  );
};
