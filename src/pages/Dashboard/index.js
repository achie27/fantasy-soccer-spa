import { Typography } from '@material-ui/core';
import TeamDetails from '../../scenes/TeamDetails';

function Dashboard() {
  return (
    <div className="dashboard center-aligned">
      <p className="dashboard-team-header">Your Team</p>
      <p className="dashboard-team-subheader">
        Double click/tap/touch on a cell to edit the players
      </p>
      <div className="dashboard-team-details">
        <TeamDetails />
      </div>
    </div>
  );
}

export default Dashboard;
