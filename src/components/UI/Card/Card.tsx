import * as React from 'react';

type CardProp = {
  children: React.ReactNode;
};

export const Card = ({ children }: CardProp) => {
  return <div className="card flex flex-col gap-2 pl-8 pb-4 pt-2">{children}</div>;
};
