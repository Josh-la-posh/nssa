import { Portal } from '@headlessui/react';

import { useNotificationActions, useNotificationList } from '@/stores/misc/notifications';

import { Notification } from './Notification';

type Props = {
  options: Partial<{
    duration: number;
  }>;
};

export const Notifications = (props: Props) => {
  const notifications = useNotificationList();
  const { remove } = useNotificationActions();

  return (
    <Portal refName="notification">
      <div
        aria-live="assertive"
        className="xs:items-end pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 px-4 py-6 sm:p-6"
      >
        {notifications.map((notification) => (
          <Notification
            options={props.options}
            key={notification.id}
            notification={notification}
            onDismiss={remove}
          />
        ))}
      </div>
    </Portal>
  );
};
