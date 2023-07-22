import { useState } from 'react';
import { AppLayout } from '@/components/Layout/AppLayout/AppLayout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ApplicationForm } from '@/components/Form/ApplicationForm';
import { Modal } from '@/components/Layout';
import { Approved } from '@/components/Layout/Modal/Approved';
import Checked from '../../../assets/images/onboarding/checked.svg';
import Reject from '../../../assets/images/app/reject.png';
import { ButtonLayout } from '@/components/UI/Button';

export function SchoolAppForm() {
  const [show, setShow] = useState(false);
  const [reject, setReject] = useState(false);
  const [block, setBlock] = useState(false);
  return (
    <>
      <AppLayout>
        <div className="pt-11 px-14">
          <div className="flex justify-between">
            <div className="sec-heading" style={{ marginBottom: '2rem' }}>
              <Link to="">
                <FontAwesomeIcon icon="arrow-left" width="16px" />
              </Link>
              <span className="ml-5" style={{ color: '#333333' }}>
                School Application Details
              </span>
            </div>
            <div className="flex gap-9">
              <button
                onClick={() => {
                  setReject(true), setShow(true);
                }}
                className="sec-btn-danger"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setReject(false), setShow(true);
                }}
                className="sec-btn"
              >
                Approve
              </button>
            </div>
          </div>
          {show && !reject && (
            <Modal>
              <Approved
                to=""
                note=""
                image={Checked}
                text="School application approved successfully"
                style={{ marginTop: '2rem', marginBottom: '3rem' }}
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
          {show && reject && (
            <Modal>
              <div className="" style={{ width: '670px' }}>
                <div className="modal__title text-center text-18 font-700 mb-9">Reject School</div>
                <div className="input flex-column">
                  <label htmlFor="" className="">
                    Add Comment
                  </label>
                  <input type="text" className="w-full input__field" placeholder="Enter comment" />
                </div>
                <div className="float-right mt-2">Block</div>
                <div className="flex gap-9 mt-12 justify-center">
                  <button
                    onClick={() => {
                      setBlock(true), setReject(false);
                    }}
                    className="sec-btn-danger"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setShow(false);
                    }}
                    className="sec-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
          {show && block && (
            <Modal>
              <Approved
                image={Reject}
                note=""
                to=""
                text="You are about to block (School's name) application from further application"
                style={{
                  marginTop: '2rem',
                  marginBottom: '5.5rem',
                  fontSize: '20px',
                  fontWeight: '400px',
                }}
              >
                <div className="flex gap-9 justify-center">
                  <div className="sec-btn-danger">Block</div>
                  <button
                    onClick={() => {
                      {
                        setShow(false), setBlock(false);
                      }
                    }}
                    className="sec-btn"
                  >
                    Cancel
                  </button>
                </div>
              </Approved>
            </Modal>
          )}
          <ApplicationForm to="" style={{}} children={undefined} />
        </div>
      </AppLayout>
    </>
  );
}
