import { Box } from '@material-ui/core';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import { NotifToastContainer } from './components/NotifToast';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './contexts/User';
import { useState } from 'react';

function App() {
  const user = useState({});
  return (
    <UserContext.Provider value={user}>
      <div>
        <NotifToastContainer />
        <Box
          minHeight="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Main />
          <Dashboard />
        </Box>
      </div>
    </UserContext.Provider>
  );
}

export default App;
