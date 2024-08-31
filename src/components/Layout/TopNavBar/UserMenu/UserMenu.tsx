import { Menu } from '@headlessui/react';
import { FC } from 'react';

import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { Button, Avatar, DropDown } from '@/components/Elements';
import { ConfirmDialog } from '@/components/Elements/Modal/confirmation';
import { useModal } from '@/hooks';
import { useAuth } from '@/lib/auth';

export const UserMenu: FC = () => {
  const {
    actions: { logout },
  } = useAuth();
  const [logoutModal, showLogoutModal] = useModal();

  const formatRole = (role: string) => {
    return role.replace(RegExp(/_/, 'g'), ' ').toLowerCase();
  };

  const actions = [
    {
      title: 'Profile',
      link: '/account',
      action: () => null,
    },
    {
      title: 'Change Password',
      link: '/account/change-password',
      action: () => null,
    },
  ];

  function handleLogout() {
    showLogoutModal({
      title: 'Logout',
      showModal: (onClose) => (
        <ConfirmDialog
          title="Log out of Oponeko"
          description="Are you sure you want to logout of Oponeko?"
          onCancel={onClose}
          onSuccess={logout}
        />
      ),
      options: {
        position: 'top',
        className: '!py-4',
      },
    });
  }

  const { user } = useAuth();

  return (
    <>
      <DropDown
        trigger={() => (
          <div className="inline-flex w-max items-center justify-center gap-2 p-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-blue-600 dark:text-white">
            {user?.avatar != null ? (
              <Avatar variant="rounded" src={user?.avatar.url} />
            ) : (
              <Avatar
                variant="rounded"
                name={`${user?.firstName} ${user?.lastName}`}
                src={user?.avatar}
              />
            )}

            <div className="mr-4 text-left text-sm hidden sm:block">
              <p className="font-semibold capitalize">{`${user?.firstName} ${user?.lastName}`}</p>
              <span className="text-xs capitalize text-gray-600">
                {formatRole(user?.accountType || '')}
              </span>
            </div>
            <ArrowIcon className="h-3 w-3 text-gray-500" />
          </div>
        )}
        className="w-max rounded-xl px-1 py-2 shadow-md shadow-gray-300 dark:shadow-dark flex flex-col"
      >
        {actions.map((x) => (
          <Menu.Item key={x.title}>
            {x.link ? (
              <Button.Link
                variant="text"
                color="tertiary"
                size="sm"
                className="!focus:ring-0 inline-block w-max !justify-start border-none !px-2.5 !py-2 text-left font-medium text-gray-600 outline-none dark:text-light"
                to={x.link}
              >
                {x.title}
              </Button.Link>
            ) : (
              <Button
                color="secondary"
                variant="text"
                size="sm"
                className="inline-block w-max !justify-start border-none !px-2.5 !py-2 text-left font-bold text-gray-600 outline-none dark:text-light"
                onClick={x.action}
              >
                {x.title}
              </Button>
            )}
          </Menu.Item>
        ))}
        <Button
          color="secondary"
          variant="text"
          size="sm"
          className="inline-block w-max !justify-start border-t !px-2.5 !py-2 text-left !font-semibold text-danger-500 outline-none"
          onClick={handleLogout}
        >
          Log out
        </Button>
      </DropDown>
      {logoutModal}
    </>
  );
};
