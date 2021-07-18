import { TextField, Button } from '@material-ui/core';
import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { getUserToken } from '../../../adapters/backend';
import { notify } from '../../../components/NotifToast';
import UserContext from '../../../contexts/User';

const useStyles = makeStyles({
  'auth-forms-item-login-field': {
    margin: '10px',
    alignSelf: 'center',
    width: '100%',
  },
  'auth-forms-item-login-button': {
    margin: '15px',
    fontWeight: 600,
    letterSpacing: 1.2,
    alignSelf: 'center',
    padding: '10px',
  },
});

function LoginBox() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    getUserToken(
      e.target.elements.email.value,
      e.target.elements.password.value
    )
      .then((data) => {
        // boom, xss

        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('token', data.data.accessToken);

        setUser({
          id: data.data.id,
          token: data.data.accessToken,
        });
      })
      .catch((e) => {
        notify(e.message, 'error');
      });
  }

  if (user?.id && user?.token) return <Redirect to="/dashboard" />;

  return (
    <div>
      <form
        className="auth-forms-item-login center-aligned"
        onSubmit={handleSubmit}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          type="text"
          autoFocus
          className={classes['auth-forms-item-login-field']}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          className={classes['auth-forms-item-login-field']}
        />
        <Button
          type="submit"
          className={classes['auth-forms-item-login-button']}
          color="primary"
          variant="contained"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginBox;
