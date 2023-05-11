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
            name="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="enter first name"
          >
            Admin First Name
          </InputLayout>
          <InputLayout
            name="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="enter last name"
          >
            Admin Last Name
          </InputLayout>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <InputLayout
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email address"
          >
            Email Address
          </InputLayout>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <SelectInputLayout name="gender" id="gender" label="Gender">
            <option value="gender">select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectInputLayout>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <InputLayout
            name="pass"
            type={showPass ? 'text' : 'password'}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
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
        <ButtonLayout to="/verify" style={{ marginTop: '2rem', marginBottom: '10px' }}>
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

// FORGOT PASSWORD

export const ForgotPasswordFormLayout = ({ style, to }: FormProps) => {
  const [email, setEmail] = useState('');
  return (
    <div style={style}>
      <form action="" className="signin">
        <InputLayout
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter email address"
        >
          Email Address
        </InputLayout>
        <ButtonLayout to={to} style={{ marginTop: '25px' }}>
          Send Code
        </ButtonLayout>

        <Link to="/">
          <span className="form-link flex" style={{}}>
            <span>icon</span>
            Go back to Login
          </span>
        </Link>
      </form>
    </div>
  );
};

// RESET PASSWORD

export const ResetPasswordFormLayout = ({ style, to }: FormProps) => {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div style={style}>
      <form action="" className="signin">
        <div style={{ marginBottom: '1.56rem' }}>
          <InputLayout
            name="email"
            type="email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a new password"
          >
            Email Password
          </InputLayout>
        </div>
        <InputLayout
          name="email"
          type="email"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Re-enter password"
        >
          Confirm Password
        </InputLayout>
        <ButtonLayout to={password === confirmPass ? '/' : ''} style={{ marginTop: '25px' }}>
          Reset Password
        </ButtonLayout>

        <Link to="/">
          <span className="form-link flex" style={{}}>
            <span>icon</span>
            Go back to Login
          </span>
        </Link>
      </form>
    </div>
  );
};
