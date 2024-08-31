import { Navigate, useParams } from 'react-router-dom';

import { useNotification } from '@/hooks';

import { Layout, ViewApplication } from '../components';

export const ViewApplicationPage = () => {
  const { id } = useParams();
  const notification = useNotification();

  if (!id) {
    notification.show({ type: 'error', message: 'Invalid application id' });
    return <Navigate to="/onboarding/school-admin" replace />;
  }
  return (
    <Layout title="View School Admin Application">
      <ViewApplication applicationId={id} />
    </Layout>
  );
};
