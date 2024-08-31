import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, ReactNode, memo, useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { ReactComponent as DashboardIcon } from '@/assets/icons/sidebar-dashboard-icon.svg';
import { Logo } from '@/components/Elements';
import { Switch } from '@/components/Form';
import { useColorMode } from '@/hooks';

type NavItemType = {
  label: string;
  link: string;
  icon: any;
  defaultExpanded?: boolean;
  children: { label: string; link: string }[];
};
const NavItemComponent = (props: NavItemType) => {
  const location = useLocation();

  const match = useMatch({
    path: location.pathname,
    end: true,
    caseSensitive: true,
  });

  const [expanded, setExpanded] = useState(props.defaultExpanded || false);
  const Icon = props.icon;
  const hasChildren = useMemo(() => props.children.length > 0, [props.children.length]);

  const isActive = useCallback(
    (link: string) => {
      if (link.slice(1, 2) === '') {
        return match?.pathnameBase === link;
      }
      return match?.pathnameBase.startsWith(link);
    },
    [match?.pathnameBase]
  );

  const Element = () => (
    <div
      className={clsx(
        'flex items-center justify-between rounded-lg transition-colors hover:bg-[#0003094d]',
        isActive(props.link) ? 'bg-[#0003094d]' : 'bg-transparent'
      )}
    >
      <Link
        to={props.link}
        className={clsx(
          'flex w-full items-center gap-2 px-[23px] py-4 text-sm font-medium',
          isActive(props.link) && 'font-semibold text-white'
        )}
      >
        <Icon className="text-blue-100" />
        {props.label}
      </Link>
      {hasChildren && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-10 w-12 items-center justify-center p-1 outline-none"
        >
          <ArrowIcon className={clsx(' transition-transform ', expanded ? 'rotate-180' : '')} />
        </button>
      )}
    </div>
  );

  return (
    <li key={props.link} className={clsx('rounded-md', expanded && 'bg-[#0003094d]')}>
      {<Element />}

      {hasChildren && (
        <Transition
          show={expanded}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0 translate-y-0 scale-50"
          enterTo="opacity-100 rotate-0 scale-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100 rotate-0 scale-100"
          leaveTo="opacity-0 scale-50"
          role="menu"
          className={clsx('space-y-2 px-8 pb-4')}
          aria-label={props.label}
        >
          {props.children.map((x) => (
            <Link
              key={props.link + x.label}
              to={x.link}
              role="menuitem"
              className={clsx(
                'flex items-center gap-2 rounded-md py-2 text-sm text-blue-100 transition-colors duration-200 hover:font-semibold hover:text-white',
                isActive(x.link) && 'font-semibold text-white'
              )}
            >
              {isActive(x.link) && <div className="h-[6px] w-[6px] rounded-full bg-blue-400" />}
              {x.label}
            </Link>
          ))}
        </Transition>
      )}
    </li>
  );
};

const NavItem = memo(NavItemComponent);

type SidebarProps = {
  list?: {
    label: string;
    link: string;
    icon: ReactNode;
    children: {
      label: string;
      link: string;
    }[];
  }[];
};

const SideNavBarComponent: FC<SidebarProps> = ({ list = sidebarItems }) => {
  const { color, setColor } = useColorMode();

  return (
    <aside className="h-full w-1/5 min-w-[256px] max-w-xs bg-blue-600 text-blue-200 shadow-sm flex flex-col items-center py-[41px]">
      <div className="">
        <Logo variant="white-text" />
        {/* <LogoWhiteText className="w-20 text-white" /> */}
      </div>
      <nav
        aria-label="Main"
        className="flex-1 overflow-y-hidden hover:overflow-y-auto mt-11 flex justify-start w-full"
      >
        <ul className="space-y-2 px-6 py-4 w-full">
          {list.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}
        </ul>
      </nav>
      <div className="absolute bg-black w-36 h-36 rounded-xl bottom-24 flex justify-center">
        {/* <img src="" alt="" /> <LogoWhiteText /> */}
      </div>

      <div className="flex-shrink-0 space-y-2 px-2 py-4 hidden">
        <div className="flex w-full items-center justify-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-1 text-blue-300">
            {/* <MoonIcon /> */}
            Dark
          </span>
          <Switch
            checked={color === 'light'}
            onChange={(e) => setColor(e.target.checked ? 'light' : 'dark')}
          />
          <span className="flex items-center gap-1">
            {/* <SunIcon /> */}
            Light
          </span>
        </div>
      </div>
    </aside>
  );
};

const sidebarItems = [
  {
    label: 'Dashboard',
    link: '/',
    icon: DashboardIcon,
    children: [],
  },
  {
    label: 'Onboarding',
    link: '/onboarding/school-admin',
    icon: DashboardIcon,
    children: [{ label: 'School Admin', link: '/onboarding/school-admin', icon: DashboardIcon }],
  },
];

export const Sidebar = memo(SideNavBarComponent);
