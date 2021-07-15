import axios from "axios";

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
