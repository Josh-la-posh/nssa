import { Link } from 'react-router-dom';
import { useState } from 'react';
import { InputLayout } from '../../UI/Input';
import { ButtonLayout } from '../../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormProps = {
  // children: React.ReactNode;
  style: any;
  to: string;
};

// SIGN IN

export const SignInFormLayout = ({ style, to }: FormProps) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  return (
    <div style={style}>
      <form action="" className="signin">
        <div className="signin__input" style={{ marginBottom: '1.56rem' }}>
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
        <InputLayout
          name="pass"
          type={showPass ? 'text' : 'password'}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="****************"
        >
          Password
          {pass.length && <FontAwesomeIcon
            onClick={() => {
              setShowPass(!showPass);
            }}
            className="search-icon absolute right-4 bottom-5"
            icon={showPass ? 'eye' : 'eye-slash'}
          />}
        </InputLayout>

        <Link to="/forgotpassword">
          <span className="form-link" style={{ float: 'right' }}>
            Forgot Password?
          </span>
        </Link>
        <ButtonLayout to="/dashboard" style={{}}>
          Sign In
        </ButtonLayout>
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

        <Link to="/login">
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
        <div className="signin__input" style={{ marginBottom: '1.56rem' }}>
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

        <Link to="/login">
          <span className="form-link flex" style={{}}>
            <span>icon</span>
            Go back to Login
          </span>
        </Link>
      </form>
    </div>
  );
};
