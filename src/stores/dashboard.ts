import { ReactNode } from 'react';

import { create } from '@/lib/zustand';

interface DashboardState {
  notificationMessage?: ReactNode;
  headerContent?: ReactNode;
  actions: DashboardActionType;
}

interface DashboardActionType {
  updateNotificationMessage: (message: ReactNode) => void;
  updateHeaderContent: (content: ReactNode) => void;
}

const useDashboardStore = create<DashboardState>()((set) => ({
  notificationMessage: null,
  headerContent: null,
  actions: {
    updateNotificationMessage: (message) =>
      set(() => ({
        notificationMessage: message,
      })),
    updateHeaderContent: (content) =>
      set(() => ({
        headerContent: content,
      })),
  },
}));

export const useDashboardState = () =>
  useDashboardStore((state) => ({
    notificationMessage: state.notificationMessage,
    headerContent: state.headerContent,
  }));

export const useDashboardActions = () => useDashboardStore((state) => state.actions);
