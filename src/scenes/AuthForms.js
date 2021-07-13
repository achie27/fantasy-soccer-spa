import { Container } from '@material-ui/core';
import { useState } from 'react';
import LoginBox from '../components/LoginBox';
import RegisterBox from '../components/RegisterBox';

function AuthForms() {
  const [authType, setAuthType] = useState('login');

  return (
    <Container maxWidth='sm' s>
      <Container>
        {authType === 'login' ? <LoginBox /> : <RegisterBox />}
      </Container>
      <Container>

        {authType === 'login' ? <span>Don't have an account? <a style={{ cursor:'pointer'}} onClick={() => setAuthType('register')}>Register now.</a></span>
          : <span><a style={{ cursor:'pointer'}} onClick={() => setAuthType('login')}>Log in</a></span>
        }

      </Container>
    </Container>
  );
};

export default AuthForms;