import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = Partial<{
  title?: string;
  description?: string;
}>;

const HeadComponent = ({ title = '', description = 'Creating the future.' }: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title} | Oponeko` : undefined} defaultTitle="Oponeko">
      <meta name="description" content={description} />
    </Helmet>
  );
};

export const Head = memo(HeadComponent);
