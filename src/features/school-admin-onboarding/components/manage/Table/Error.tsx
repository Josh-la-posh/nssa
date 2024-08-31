import { Button } from '@/components/Elements';

// import { ReactComponent as EmptyState } from '../../assets/illustrations/access-denied.svg';

export const ErrorComponent = ({
  refresh,
  errorMessage,
}: {
  refresh: () => void;
  errorMessage: string;
}) => {
  return (
    <div className=" text-blue-600 dark:text-light max-w-screen-md mx-auto text-center h-full flex flex-col items-center justify-center gap-8 p-6">
      <h2 className="text-2xl font-medium">Something went wrong :)</h2>
      {/* <EmptyState className="max-h-60 max-w-full" /> */}
      <div>
        <p className="first-letter:capitalize pb-2">{errorMessage}</p>
        <p className="text-sm font-medium">
          Try adjusting your filter to find what you&apos;re looking for
        </p>
      </div>
      <Button size="sm" onClick={refresh}>
        Try again
      </Button>
    </div>
  );
};
