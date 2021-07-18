import { TextField, Button } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { registerUser } from '../../../adapters/backend';
import { notify } from '../../../components/NotifToast';
import UserContext from '../../../contexts/User';

const useStyles = makeStyles({
  'auth-forms-item-register-field': {
    margin: '10px',
    alignSelf: 'center',
    width: '100%',
  },
  'auth-forms-item-register-button': {
    margin: '15px',
    fontWeight: 600,
    letterSpacing: 1.2,
    alignSelf: 'center',
    padding: '10px',
  },
});

function RegisterBox() {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const [registeredId, setRegisteredId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    registerUser(
      e.target.elements.email.value,
      e.target.elements.password.value
    )
      .then((data) => {
        setRegisteredId(data.data.userId);
      })
      .catch((e) => {
        notify(e.message, 'error');
      });
  }

  if (user?.id && user?.token) return <Redirect to="/dashboard" />;

  return (
    <div>
      {registeredId ? (
        <div className="auth-forms-item-register-info">
          Congrats, you've been registered! Log in now to access the platform
        </div>
      ) : (
        <form
          className="auth-forms-item-register center-aligned"
          onSubmit={handleSubmit}
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            type="text"
            autoFocus
            className={classes['auth-forms-item-register-field']}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            className={classes['auth-forms-item-register-field']}
          />
          <Button
            type="submit"
            className={classes['auth-forms-item-register-button']}
            color="primary"
            variant="contained"
          >
            Register
          </Button>
        </form>
      )}
    </div>
  );
}

export default RegisterBox;
