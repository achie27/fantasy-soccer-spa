import { Toolbar, AppBar, Button } from '@material-ui/core';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { NotifToastContainer } from './components/NotifToast';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './contexts/User';
import { useState, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  'appbar-title': {
    flexGrow: 1,
    textTransform: 'uppercase',
    fontWeight: 900,
    letterSpacing: '2px',
    width: '30%',
    float: 'left',
  },
  'appbar-logout-button': {
    letterSpacing: 1.2,
    fontWeight: 600,
  },
}));

function getLoggedInUserFromStorage() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (userId && token) {
    return {
      id: userId,
      token,
    };
  }

  return {
    id: '',
    token: '',
  };
}

function removeLoggedInUserFromStorage() {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
}

function App() {
  const [user, setUser] = useState(getLoggedInUserFromStorage());

  const classes = useStyles();
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className={classes.header}>
        <AppBar position="sticky">
          <Toolbar>
            <div className={classes['appbar-title']}>Fantasy S⚽ccer</div>
            {user?.id && (
              <div className={classes['appbar-logout']}>
                <Button
                  className={classes['appbar-logout-button']}
                  color="inherit"
                  onClick={() => {
                    removeLoggedInUserFromStorage();
                    setUser({});
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div className="app">
        <div className="container">
          <NotifToastContainer />
          <div className="app-component">
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} exact />
              <Route path="/" component={Landing} exact />
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const [user] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.id && user?.token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default App;
