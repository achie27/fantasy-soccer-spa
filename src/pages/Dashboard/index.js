import {Typography} from '@material-ui/core';
import TeamDetails from '../../scenes/TeamDetails';

function Dashboard() {
  return (
    <div style={{ height: 400, width: '60%' }}>
      <Typography  variant="h4" gutterBottom>
        YOUR TEAM
      </Typography>
      <TeamDetails />
    </div>
  );
}

export default Dashboard;
