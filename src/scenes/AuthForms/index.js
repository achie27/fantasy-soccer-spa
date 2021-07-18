import { div } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import UserContext from '../../contexts/User';

function AuthForms() {
  const [user] = useContext(UserContext);
  const [authType, setAuthType] = useState('login');

  if (user?.id && user?.token) return <Redirect to="/dashboard" />;

  return (
    <div className="auth-forms">
      <div className="auth-forms-item">
        {authType === 'login' ? <LoginBox /> : <RegisterBox />}
      </div>

      <div className="auth-forms-info">
        {authType === 'login' ? (
          <div>
            Don't have an account? <nbsp />
            <a onClick={() => setAuthType('register')}>Register now.</a>
          </div>
        ) : (
          <div>
            <a onClick={() => setAuthType('login')}>Go back to log in?</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForms;
