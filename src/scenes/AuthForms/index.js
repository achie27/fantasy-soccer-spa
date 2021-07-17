import { Container } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import UserContext from '../../contexts/User';

function AuthForms() {
  const [user] = useContext(UserContext);
  const [authType, setAuthType] = useState('login');

  return (
    <Container maxWidth="sm">
      <Container>
        {authType === 'login' ? <LoginBox /> : <RegisterBox />}
      </Container>
      {user?.id && user?.token ? (
        <Redirect to="/dashboard" />
      ) : (
        <Container>
          {authType === 'login' ? (
            <span>
              Don't have an account?
              <a
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => setAuthType('register')}
              >
                Register now.
              </a>
            </span>
          ) : (
            <span>
              <a
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => setAuthType('login')}
              >
                Log in
              </a>
            </span>
          )}
        </Container>
      )}
    </Container>
  );
}

export default AuthForms;
