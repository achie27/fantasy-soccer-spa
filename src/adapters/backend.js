import axios from 'axios';

export const getUserToken = async (email, password) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/v1/auth/token/new`,
      { email, password }
    );
    return data.data;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    }

    throw new Error(e.toJSON().message);
  }
};

export const registerUser = async (email, password) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_API_HOST}/api/v1/auth/register`,
      { email, password }
    );
    return data.data;
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    }

    throw new Error(e.toJSON().message);
  }
};

export const fetchTeam = async (userId, token) => {
  try {
    const {
      data: { data: user },
    } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/v1/users/${userId}`,
      {
        headers: {
          'access-token': token,
        },
      }
    );

    const {
      data: { data: team },
    } = await axios.get(
      `${process.env.REACT_APP_API_HOST}/api/v1/teams/${user.teams[0]?.id}`,
      {
        headers: {
          'access-token': token,
        },
      }
    );

    const players = (
      await Promise.all(
        team.players.map(async (p) => {
          return await axios.get(
            `${process.env.REACT_APP_API_HOST}/api/v1/players/${p.id}`,
            {
              headers: {
                'access-token': token,
              },
            }
          );
        })
      )
    ).map((d) => d.data.data);

    return {
      id: team.id,
      name: team.name,
      players,
    };
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.code);
    }

    throw new Error(e.toJSON().message);
  }
};
