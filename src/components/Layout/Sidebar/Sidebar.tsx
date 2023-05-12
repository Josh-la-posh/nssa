import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../../assets/images/onboarding/logo-white.svg';
type HeaderProps = {
  children: React.ReactNode;
};

export const Sidebar = () => {
  return (
    <div className="sidebar relative flex-column a-center pt-5">
      <div >
        <img src={Logo} alt="" />
      </div>

      <div className="school-logo absolute bg-black w-36 h-36 rounded-xl bottom-24">
        <img src="" alt="" />
      </div>
    </div>
  );
};
