import { Container, List, ListItem, ListItemText } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/User';
import { fetchTeam } from '../../adapters/backend';
import { notify } from '../../components/NotifToast';

function TeamDetails() {
  const [user] = useContext(UserContext);
  const [team, setTeam] = useState({
    id: '',
    name: '',
    players: [],
  });

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

  return (
    <Container maxWidth="sm">
      <List>
        {team?.players.map((p) => {
          return (
            <ListItem key={p.id}>
              <ListItemText
                primary={`${p.firstName} ${p.lastName}`}
                secondary={`Value ${p.value}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default TeamDetails;
