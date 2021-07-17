import { Box } from '@material-ui/core';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { NotifToastContainer } from './components/NotifToast';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './contexts/User';
import { useState, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        <NotifToastContainer />
        <Box
          minHeight="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Switch>
            <PrivateRoute path='/dashboard' component={Dashboard} exact/>
            <Route path='/' component={Landing} exact/>
            <Route>
              <Redirect to='/'/>
            </Route>
          </Switch>
        </Box>
      </div>
    </UserContext.Provider>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const [user] = useContext(UserContext);

  return <Route
    {...rest}
    render={props =>
      user?.id && user?.token ? (
        <Component {...props} />
      ) : (
        <Redirect to='/'/>
      )
    }
  />;
}

export default App;
