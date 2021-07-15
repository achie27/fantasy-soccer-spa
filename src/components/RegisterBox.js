import { TextField, Button } from '@material-ui/core';
import { useContext, useState } from 'react';
import { registerUser } from '../adapters/backend';
import { notify } from '../components/NotifToast';
import UserContext from '../contexts/User';

function RegisterBox() {
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

  return (
    <div>
      {user?.id && user?.accessToken ? (
        <span>Will render dashboard</span> // Redirect to Dashboard
      ) : registeredId ? (
        <span>
          Congrats, you've been registered! Log in now to access the platform
        </span>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            type="text"
            autoFocus
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
          />
          <Button type="submit">Register</Button>
        </form>
      )}
      ;
    </div>
  );
}

export default RegisterBox;
