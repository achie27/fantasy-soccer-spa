import { Box } from '@material-ui/core';
import Main from './pages/Main';
import { NotifToastContainer } from './components/NotifToast';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './contexts/User';
import { useState } from 'react';
import TeamDetails from './scenes/TeamDetails';

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
          <TeamDetails />
        </Box>
      </div>
    </UserContext.Provider>
  );
}

export default App;
