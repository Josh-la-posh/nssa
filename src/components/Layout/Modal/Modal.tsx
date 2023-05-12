import * as React from 'react';
import { ButtonLayout } from '@/components/UI/Button';

import Checked from '../../../assets/images/onboarding/checked.svg';

type ModalProps = {
  children: React.ReactNode;
  to: string;
  note: string;
};

export const Modal = ({ children, to, note }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__body">
          <div className="img">
            <img src={Checked} alt="Success" />
          </div>
          <div className="sec-heading u-center" style={{ marginTop: '3rem', marginBottom: '1rem' }}>
            {children}
          </div>
          <p className="text-400-16">{note}</p>
          <ButtonLayout to={to} style={{ width: '100%', marginTop: '24px' }}>
            <div
              className="flex a-center j-center"
              style={{ height: '100%', backgroundColor: '#3065BB', borderRadius: '4px' }}
            >
              Continue
            </div>
          </ButtonLayout>
        </div>
      </div>
    </div>
  );
};
