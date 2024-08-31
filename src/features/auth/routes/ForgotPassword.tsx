import { useState, useEffect } from 'react';

import { CheckYourEmail, ForgotPasswordForm, Layout } from '../components';

const Forms = [ForgotPasswordForm, CheckYourEmail];

export const ForgotPassword = () => {
  const [formPosition, setFormPosition] = useState(0);

  const handleNext = () => {
    if (formPosition < Forms.length) {
      setFormPosition(formPosition + 1);
    }
  };
  useEffect(() => {
    setFormPosition(0);
  }, []);

  const Form = Forms[formPosition];

  return (
    <Layout>
      <Form onSuccess={handleNext} />
    </Layout>
  );
};
