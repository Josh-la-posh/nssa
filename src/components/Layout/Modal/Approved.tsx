import * as React from 'react';

type ApproveProps = {
  children: React.ReactNode;
  to: string;
  note: string;
  image: string;
  text: string;
  style: any;
};

export const Approved = ({ children, to, text, note, image, style }: ApproveProps) => {
  return (
    <div>
      <div className="modal__body">
        <div className="img">
          <img src={image} alt="Success" />
        </div>
        <div className="sec-heading u-center" style={style}>
          {text}
        </div>
        <p className="text-400-16">{note}</p>
        {children}
      </div>
    </div>
  );
};
