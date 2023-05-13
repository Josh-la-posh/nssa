import { Link } from 'react-router-dom';
import { useState } from 'react';
import { InputLayout, SelectInputLayout } from '../../UI/Input';
import { ButtonLayout } from '../../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormProps = {
  // children: React.ReactNode;
  style: any;
  to: string;
};

// SIGN IN

export const SignUpFormLayout = ({ style, to }: FormProps) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  return (
    <div style={style}>
      <form action="" className="signin">
        <div style={{ marginBottom: '1rem', gap: '20px' }} className="flex">
          <InputLayout
            type="text"
            value={firstname}
            onChange={(e: any) => setFirstname(e.target.value)}
            placeholder="enter first name"
          >
            Admin First Name
          </InputLayout>
          <InputLayout
            type="text"
            value={lastname}
            onChange={(e: any) => setLastname(e.target.value)}
            placeholder="enter last name"
          >
            Admin Last Name
          </InputLayout>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <InputLayout
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="enter email address"
          >
            Email Address
          </InputLayout>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <SelectInputLayout id="gender" label="Gender">
            <option value="gender">select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectInputLayout>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <InputLayout
            type={showPass ? 'text' : 'password'}
            value={pass}
            onChange={(e: any) => setPass(e.target.value)}
            placeholder="****************"
          >
            Password
            {pass.length && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowPass(!showPass);
                }}
                className="search-icon absolute right-4 bottom-5"
                icon={showPass ? 'eye' : 'eye-slash'}
              />
            )}
          </InputLayout>
        </div>

        <div className="flex a-start" style={{ gap: '15px' }}>
          <input type="checkbox" />
          <p className="text-400-12">
            By creating an account you agree to the terms of use and our
            <Link to="/forgotpassword">
              <u style={{ color: '#215EAA' }}> privacy policy.</u>{' '}
            </Link>
          </p>
        </div>
        <ButtonLayout
          onClick={() => {}}
          to="/verify"
          style={{ marginTop: '2rem', marginBottom: '10px' }}
        >
          Sign Up
        </ButtonLayout>
        <div className="flex j-center">
          <p className="text-600-12">
            Already have an account?
            <Link to="/login">
              <span className="form-link"> Login</span>{' '}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
