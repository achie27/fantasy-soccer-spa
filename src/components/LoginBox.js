import { TextField, Button } from '@material-ui/core';
import { useContext } from 'react';
import { getUserToken } from '../adapters/backend';
import { notify } from '../components/NotifToast';
import UserContext from '../contexts/User';

function LoginBox() {
  const [user, setUser] = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();

    getUserToken(
      e.target.elements.email.value,
      e.target.elements.password.value
    )
      .then((data) => {
        setUser({
          id: data.data.id,
          token: data.data.accessToken,
        });
      })
      .catch((e) => {
        notify(e.message, 'error');
      });
  }

  return (
    <div>
      {user?.id && user?.token ? (
        <span>Will render dashboard</span> // Redirect to Dashboard
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
          <Button type="submit">Login</Button>
        </form>
      )}
      ;
    </div>
  );
}

export default LoginBox;
