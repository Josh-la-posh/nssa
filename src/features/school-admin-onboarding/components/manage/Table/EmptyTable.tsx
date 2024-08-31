import { Button } from '@/components/Elements';

// import { ReactComponent as EmptyState } from '../../assets/illustrations/empty-state.svg';

export const EmptyTable = () => {
  return (
    <div className=" text-blue-600 dark:text-light max-w-screen-md mx-auto text-center h-full flex flex-col items-center justify-center gap-8 p-6">
      <h2 className="text-2xl font-medium">You have not created any users</h2>
      {/* <EmptyState className="max-w-full max-h-80" /> */}
      <div>
        <p className="first-letter:capitalize pb-2">
          Chuck it in the ute we&apos;re putting in some decking a poor tradie blames his tools
          cutting up at the sparrows... civil works call a handyman renovation monster.
        </p>
        <p className="text-sm font-medium">
          Try adjusting your filter to find what you&apos;re looking for
        </p>
      </div>
      <Button.Link to="/users/create">Create user</Button.Link>
    </div>
  );
};
