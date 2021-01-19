import axios from 'axios';

import REQUEST_STATUS from './utils';

const BASEURL = 'https://api.github.com/users/';

async function fetchGithubUser(name, dispatch) {
  try {
    const response = await axios.get(`${BASEURL}${name}`);
    dispatch({ status: REQUEST_STATUS.RESOLVED, data: response.data });
  } catch (err) {
    dispatch({ status: REQUEST_STATUS.REJECTED, error: 'User not found' });
  }
}

export default fetchGithubUser;
