import React from 'react';

const UserContext = React.createContext([
  {
    id: '',
    token: '',
  },
  () => {},
]);

export default UserContext;
