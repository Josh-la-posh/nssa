import { useState } from 'react';
import Logo from '../../../assets/images/onboarding/logo-white.svg';
import { sidebars } from '@/Data';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  var page = localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : 0;
  const [curr, setCurr] = useState(page);

  return (
    <div className="sidebar relative flex-column a-center pt-5 px-5">
      <div className="mb-9">
        <img src={Logo} alt="" />
      </div>

      <div className="w-full">
        {sidebars.map(({ icon, url, title, id }, index: any) => {
          return (
            <div
              className=""
              key={index}
              onClick={(e) => {
                e.preventDefault(), localStorage.setItem('page', index);
              }}
            >
              <Link to={url}>
                <div
                  className={`flex gap-5 items-center justify-start mb-7 pl-5 text-white ${
                    index === 0 ? 'text-700-15' : 'text-400-15'
                  } ${index === curr && 'active'}`}
                  onClick={() => setCurr(index)}
                >
                  <span className="flex justify-center active:mr-5" style={{ width: '20px' }}>
                    <img src={icon} alt="Icon" />
                  </span>
                  <p className="active:ml-5">{title}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
