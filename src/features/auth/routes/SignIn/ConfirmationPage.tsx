import { useState } from 'react';
import { ButtonLayout } from '@/components/UI/Button';
import Logo from '../../../../assets/images/onboarding/logo-blue.svg';
import Logo2 from '../../../../assets/images/onboarding/img-3.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ConfirmationPage = () => {
  const [manual, setManual] = useState(0);
  return (
    <div className="confrmationPage flex-column a-center">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>

      <span className="icon flex a-center j-center">
        <img src={Logo2} alt="" />
      </span>

      <div className="pri-heading">Check your email</div>
      <div className="text-500-12 u-center" style={{ width: '162px' }}>
        We sent a verification link to maikieepilat@gmail.com
      </div>

      {manual === 0 ? (
        <button
          className="pri-btn"
          style={{ marginTop: '51px', width: '339px' }}
          onClick={() => setManual(1)}
        >
          Enter Code Manually
        </button>
      ) : (
        <div className="manual-input">
          <div className="input flex j-between">
            <input type="number" maxLength={1} required />
            <input type="number" max="1" required />
            <input type="number" max="1" required />
            <input type="number" max="1" required />
            <input type="number" max="1" required />
          </div>
          <ButtonLayout
            onClick={() => {}}
            style={{ marginTop: '22px', width: '339px' }}
            to="/reset"
          >
            Confirm
          </ButtonLayout>
        </div>
      )}

      <div className="btns flex items-center">
        <Link to="/login">
          <span className="form-link flex">
            <FontAwesomeIcon className="self-center" icon="arrow-left" />
            Go back to Login
          </span>
        </Link>
        <Link to="">
          <span className="form-link" style={{ color: '#F2994A' }}>
            Resend Code
          </span>
        </Link>
      </div>
    </div>
  );
};
