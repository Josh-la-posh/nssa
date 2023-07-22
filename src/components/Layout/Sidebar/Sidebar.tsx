import Logo from '../../../assets/images/onboarding/logo-white.svg';
import { sidebars } from '@/Data';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar relative flex-column a-center pt-5 px-5">
      <div className="mb-9">
        <img src={Logo} alt="" />
      </div>

      <nav className="w-full">
        <ul className="w-full">
          {sidebars.map(({ icon, url, title, id }, index: any) => {
            return (
              <li className="" key={index}>
                <NavLink
                  to={url}
                  className={`flex gap-5 items-center justify-start mb-7 pl-5 text-white ${
                    index === 0 ? 'text-700-15' : 'text-400-15'
                  }`}
                >
                  <span className="flex justify-center active:mr-5" style={{ width: '20px' }}>
                    <img src={icon} alt="Icon" />
                  </span>
                  <p className="active:ml-5">{title}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
