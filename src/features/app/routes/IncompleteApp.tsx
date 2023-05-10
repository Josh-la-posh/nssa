import { AppLayout } from '@/components/Layout/AppLayout/AppLayout';
import Image from '../../../assets/images/app/img-1.svg';
import { Link } from 'react-router-dom';

export function IncompleteApp() {
  return (
    <>
      <AppLayout>
        <div className="flex flex-col items-center">
          <div className="intro w-full h-28 rounded-lg pl-10 py-7 bg-priBlueColor text-blueWhiteColor">
            <h1 className="sec-heading">Hello (Admin Name)</h1>
            <p className="text-sm text">Welcome back!</p>
          </div>
          <div className="img w-96 h-96 my-14">
            <img src={Image} alt="" />
          </div>
          <p style={{ fontSize: '15px', fontWeight: '400px', color: '#38393C' }}>
            Your school application is not completed
          </p>
          <p style={{ fontSize: '15px', fontWeight: '400px', color: '#38393C' }}>
            Follow the button below
          </p>
          <div className="flex gap-5 my-16 text-500-12">
            <button
              className="sec-btn"
              style={{ color: '#2F80ED', background: '#fff' }}
            >
              Re-Apply
            </button>
            <Link to="/appform">
              <button className="sec-btn">
                Fill School Application
              </button>
            </Link>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
