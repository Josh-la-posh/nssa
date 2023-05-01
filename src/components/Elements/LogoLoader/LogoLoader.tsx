// import { Logo } from '@/components/Logo';

export const LogoLoader = () => {
  return (
    <div role="status" className="h-screen  max-w-screen inset-0 overflow-hidden">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h1>Logo</h1>
        <p className="font-medium text-base animate-pulse tracking-wide">darey.io</p>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
