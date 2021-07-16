import { Container, IconButton } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/User';
import { fetchTeam, updatePlayersInTeam } from '../../adapters/backend';
import { notify } from '../../components/NotifToast';
import { Delete } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';

function TeamDetails() {
  const [user] = useContext(UserContext);
  const [team, setTeam] = useState({
    id: '',
    name: '',
    players: [],
  });

  const columns = [
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 150,
      type: 'number',
    },
    {
      field: 'deletebutton',
      headerName: 'Delete Player',
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            updatePlayersInTeam(
              team.id,
              team.players.filter((p) => p.id != params.id),
              user?.token
            ).then(() => {
              setTeam((oldTeam) => {
                return {
                  ...oldTeam,
                  players: oldTeam.players.filter((p) => p.id != params.id),
                };
              });
              notify(`Player ${params.id} removed from team`, 'info');
            });
          }}
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    if (user?.id && !team?.id) {
      fetchTeam(user.id, user.token)
        .then((team) => {
          setTeam(team);
        })
        .catch((e) => {
          notify(e.message, 'error');
        });
    }
  }, [user.id]);

  function processCellEdit(e) {
    // e.stopPropagation();
    console.log(e);
  }

  return (
    <div style={{ height: 400, width: '80%' }}>
      {team?.players?.length > 0 && (
        <DataGrid
          rows={team.players.map((p) => ({
            id: p.id,
            firstName: p.firstName,
            lastName: p.lastName,
            value: p.value,
          }))}
          columns={columns}
          pageSize={10}
          onEditCellChangeCommitted={processCellEdit}
        />
      )}
    </div>
  );
}

export default TeamDetails;
