import axios from "axios";

// new user check
export const createOrUpdateUser = async (authtoken) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// current user check
export const currentUser = async (authtoken) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// admin user check
export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
