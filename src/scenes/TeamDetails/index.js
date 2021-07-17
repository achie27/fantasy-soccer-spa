import { IconButton } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/User';
import {
  fetchTeam,
  updatePlayersInTeam,
  updatePlayerDetails,
} from '../../adapters/backend';
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
  const [teamLoaded, setTeamLoaded] = useState(false);

  const columns = [
    {
      field: 'firstName',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'First name',
      flex: 1,
      editable: true,
    },
    {
      field: 'lastName',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Last name',
      flex: 1,
      editable: true,
    },
    {
      field: 'type',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Position',
      flex: 0.8,
    },
    {
      field: 'value',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Value',
      flex: 0.8,
      type: 'number',
    },
    {
      field: 'deleteButton',
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      headerName: 'Remove Player',
      flex: 0.8,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            updatePlayersInTeam(
              team.id,
              team.players.filter((p) => p.id !== params.id),
              user?.token
            )
              .then(() => {
                setTeam((oldTeam) => {
                  return {
                    ...oldTeam,
                    players: oldTeam.players.filter((p) => p.id !== params.id),
                  };
                });
                notify(`Player ${params.id} removed from team`, 'info');
              })
              .catch((e) => {
                console.error(e);
                notify("Couldn't delete player ", 'error');
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
          setTeamLoaded(true);
        })
        .catch((e) => {
          notify(e.message, 'error');
        });
    }
  }, [user.id]);

  function processCellEdit(e) {
    updatePlayerDetails(e.id, { [e.field]: e.props.value }, user?.token)
      .then(() => {
        notify(`Player ${e.id} has been edited`, 'info');
        setTeam((oldTeam) => {
          return {
            ...oldTeam,
            players: oldTeam.players.map((p) => {
              if (p.id === e.id) return { ...p, [e.field]: e.props.value };

              return p;
            }),
          };
        });
      })
      .catch((e) => {
        console.error(e);
        notify("Couldn't update player ", 'error');
      });
  }

  return (
      <DataGrid
        rows={team?.players?.map((p) => ({
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          value: p.value,
          type: p.type,
        }))}
        columns={columns}
        pageSize={15}
        loading={!teamLoaded}
        disableColumnMenu
        disableColumnFilter
        dis
        onEditCellChangeCommitted={processCellEdit}
      />
  );
}

export default TeamDetails;
