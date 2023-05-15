import { useState } from 'react';
import { ButtonLayout } from '@/components/UI/Button';
import Logo from '../../../../assets/images/onboarding/logo-blue.svg';
import Logo2 from '../../../../assets/images/onboarding/img-3.png';
import Checked from '../../../../assets/images/onboarding/checked.svg';
import { Link } from 'react-router-dom';
import { Modal } from '@/components/Layout/Modal';
import { Approved } from '@/components/Layout/Modal/Approved';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const VerificationPage = () => {
  const [manual, setManual] = useState(0);
  const [show, setShow] = useState(false);
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
        <div>
          <button
            className="pri-btn"
            style={{ marginTop: '51px', width: '339px' }}
            onClick={() => setManual(1)}
          >
            Enter Code Manually
          </button>
          <div className="btns flex j-center">
            <Link to="/">
              <span className="form-link flex">
                <FontAwesomeIcon className="f self-center" icon="arrow-left" />
                Back to Login
              </span>
            </Link>
          </div>
        </div>
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
            onClick={() => setShow(true)}
            style={{ marginTop: '22px', width: '339px' }}
            to=""
          >
            Confirm
          </ButtonLayout>
          {show && (
            <Modal>
              <Approved
                image={Checked}
                note="Go to Login"
                to="/login"
                text="Your email has been verified successfully"
                style={{ marginTop: '3rem', marginBottom: '1rem' }}
              >
                <ButtonLayout onClick={() => {}} to="" style={{ width: '100%', marginTop: '24px' }}>
                  <div
                    className="flex a-center j-center"
                    style={{ height: '100%', backgroundColor: '#3065BB', borderRadius: '4px' }}
                  >
                    Continue
                  </div>
                </ButtonLayout>
              </Approved>
            </Modal>
          )}

          <div className="btns flex j-center a-center">
            <Link to="/login">
              <span className="form-link flex">
                <FontAwesomeIcon className="f self-center" icon="arrow-left" />
                Back to Login
              </span>
            </Link>
            <Link to="">
              <span className="form-link" style={{ color: '#F2994A' }}>
                Resend OTP
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
