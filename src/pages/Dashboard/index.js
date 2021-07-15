import { Container } from '@material-ui/core';
import { NotifToastContainer } from '../../components/NotifToast';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../../contexts/User';
import { useState } from 'react';

function Dashboard() {
  return (
    <UserContext.Provider value={user}>
      <div>
        <NotifToastContainer />
        <Container>YeeEEEEt</Container>
      </div>
    </UserContext.Provider>
  );
}

export default Dashboard;
