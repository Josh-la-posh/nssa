import { useState } from 'react';
import { InputLayout, SelectInputLayout } from '../../UI/Input';
import { Modal } from '@/components/Layout';
// import { ButtonLayout } from '../../UI/Button';

type FormProps = {
  children: React.ReactNode;
  style: any;
  to: string;
};

// SIGN IN

export const ApplicationForm = ({ style, to }: FormProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [show, setShow] = useState(false);
  return (
    <div style={style}>
      <form action="" className="">
        <div className="mb-8">
          <label htmlFor="" className="text-400-16 text-darkText">
            School Name
          </label>
          <InputLayout
            type="text"
            placeholder="School Name"
            value={school}
            onChange={(e: any) => setSchool(e.target.value)}
            children={undefined}
          />
        </div>
        <div className="mb-8 flex gap-11 w-full">
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Address
            </label>
            <InputLayout
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              children={undefined}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Phone Number
            </label>
            <InputLayout
              type="number"
              placeholder="Enter your phone number"
              value={phoneNo}
              onChange={(e: any) => setPhoneNo(e.target.value)}
              children={undefined}
            />
          </div>
        </div>
        <div className="mb-8 flex gap-11">
          <span className="text-400-16">Use admin details for school owner's informaton</span>
        </div>
        <div className="mb-8 flex gap-11">
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Owner's Name
            </label>
            <InputLayout
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              children={undefined}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Owner's Email Address
            </label>
            <InputLayout
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              children={undefined}
            />
          </div>
        </div>
        <div className="mb-8 flex gap-11">
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              City
            </label>
            <InputLayout
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              children={undefined}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              State
            </label>
            <SelectInputLayout label="" id="state">
              <option
                value={state}
                onClick={() => {
                  setState(state);
                }}
              >
                Select state
              </option>
            </SelectInputLayout>
          </div>
        </div>
        <div className="">
          <label htmlFor="file" className="text-400-16 text-darkText">
            Upload Document
            <div className="flex flex-col gap-2 justify-center items-center py-6 border rounded mt-4 border-greyLight">
              <p className="text-400-12">Drop file here</p>
              <div className="border border-priBlueColor rounded p-2 text-priBlueColor cursor-pointer">
                <input id="file" type="file" style={{ display: 'none' }} />
                Choose file
              </div>
            </div>
          </label>
        </div>
        <div className="text-400-16 float-right mt-4 text-priBlueColor cursor-pointer">
          <label htmlFor="file">
            Add More Document
            <input type="file" id="file" style={{ display: 'none' }} />
          </label>
        </div>
        <div className="flex justify-center mt-24">
          <button onClick={() => setShow(true)} className="sec-btn">
            Submit Application
          </button>
        </div>
        {show && (
          <Modal to="" note="You will be notified when your account get verified">
            Your Application Has Been Submitted Successfully!
          </Modal>
        )}
      </form>
    </div>
  );
};
