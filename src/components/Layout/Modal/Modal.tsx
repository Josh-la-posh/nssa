import * as React from 'react';

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  );
};
