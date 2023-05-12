import * as React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  style: any;
  to: string;
  onClick: any;
};

export const ButtonLayout = ({ children, style, to, onClick }: ButtonProps) => {
  return (
    <div style={style}>
      <Link to={to}>
        <button onClick={onClick} className="pri-btn">{children}</button>
      </Link>
    </div>
  );
};
