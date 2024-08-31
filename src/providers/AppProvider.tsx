import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { LogoLoader } from '@/components/Elements';
import { NetworkIndicator } from '@/components/Elements/NetworkIndicator';
import { ErrorBoundary } from '@/components/Layout';
import { Notifications } from '@/components/Notification';
import { useColorMode } from '@/hooks';
import { queryClient } from '@/lib/react-query';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  useColorMode('light');

  const handleQueryClient = queryClient;

  return (
    <Suspense fallback={<LogoLoader />}>
      <ErrorBoundary>
        <HelmetProvider>
          <NetworkIndicator />
          <QueryClientProvider client={handleQueryClient}>
            {/* TODO: Only on non-production environments */}
            <ReactQueryDevtools initialIsOpen={false} />
            {/*  */}
            <Notifications options={{ duration: 5000 }} />
            {children}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
