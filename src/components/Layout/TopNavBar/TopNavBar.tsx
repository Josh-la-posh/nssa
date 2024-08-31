import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as SearchIcon } from '@/assets/icons/icon-search.svg';
import { ReactComponent as MenuIcon } from '@/assets/icons/menu.svg';
import { ReactComponent as CommunityIcon } from '@/assets/icons/top-navbar-community-icon.svg';
import { ReactComponent as NotificationIcon } from '@/assets/icons/top-navbar-notification-icon.svg';
import { Logo } from '@/components/Elements';
import { Input } from '@/components/Form';
import { useDashboardState } from '@/stores/dashboard';

import { Sidebar } from '..';

import { UserMenu } from './UserMenu';

function HeaderAction() {
  return (
    <>
      <div className="flex w-full gap-6 items-center justify-start md:justify-end">
        <div className="w-full rounded-md border-[2px] border-[#F2F2F2] hidden lg:block">
          <Input
            placeholder="Search for ..."
            size="sm"
            className="flex w-full lg:w-[321px] h-[36px] border-none pr-4 !text-dark placeholder-gray-400 "
            endIcon={
              <button className="">
                <SearchIcon />
              </button>
            }
          />
        </div>
        <button>
          <CommunityIcon />
        </button>
        <button>
          <NotificationIcon />
        </button>
        <div className="lg:hidden block">
          <UserMenu />
        </div>
      </div>
    </>
  );
}

export const TopNavBar = () => {
  const { headerContent } = useDashboardState();
  return (
    <header className="sticky top-0 z-20 h-fit w-full bg-white py-4 px-[10px] shadow-sm md:px-[41px] dark:bg-dark">
      <div className="flex justify-between items-center order-1">
        <div className="hidden lg:block">{headerContent}</div>
        <div className="inline-flex items-center lg:hidden">
          <Link to="/" className="">
            <Logo className="w-20 h-20" variant="primary" />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-[37px] justify-end order-3 lg:order-2">
          <div className="hidden lg:inline-block">
            <HeaderAction />
          </div>
          <div className="ml-4 hidden lg:block">
            <UserMenu />
          </div>
          <Popover className="top-0 lg:hidden">
            {({ open }) => (
              <>
                <Popover.Button className="outline-none">
                  <MenuIcon />
                </Popover.Button>
                <div
                  className={clsx(
                    open ? 'block' : 'hidden',
                    'fixed left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-60 backdrop-blur-sm transition-colors duration-300'
                  )}
                >
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-x-64"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="relative h-full w-max p-4 lg:p-0">
                      <Sidebar />
                    </Popover.Panel>
                  </Transition>
                </div>
              </>
            )}
          </Popover>
        </div>
        <div className="inline-block lg:hidden order-2 lg:order-3">
          <HeaderAction />
        </div>
      </div>
    </header>
  );
};
