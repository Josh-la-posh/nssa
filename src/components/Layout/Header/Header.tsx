import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type HeaderProps = {
  children: React.ReactNode;
};

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-11 py-3">
      <h2 className="mr-auto">Admin</h2>
      <div className="search-bar mr-11 h-9 w-80 rounded flex justify-between items-center pr-4">
        <input type="text" placeholder="Search for ..." />
        <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
      </div>
      <div className="icon mr-6 flex">
        <FontAwesomeIcon icon="users" className="h-5" color="#323232" />
      </div>
      <div className="icon flex ">
        <FontAwesomeIcon className="h-6" icon="bell" color="#4F4F4F" />
      </div>
      <div className="img w-10 h-10 bg-black ml-10 rounded-full">
        <img src="" alt="" />
      </div>
    </header>
  );
};
