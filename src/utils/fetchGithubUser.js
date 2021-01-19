import axios from 'axios';

import { REQUEST_STATUS } from './utils';

const BASEURL = 'https://api.github.com/users/';

async function fetchGithubUser(userName, dispatch) {
  try {
    if (userName) {
      const response = await axios.get(`${BASEURL}${userName}`);
      dispatch({ type: REQUEST_STATUS.RESOLVED, data: response.data });
    } else {
      dispatch({ type: REQUEST_STATUS.IDLE });
    }
  } catch (err) {
    dispatch({ type: REQUEST_STATUS.REJECTED, error: 'User not found' });
  }
}

export default fetchGithubUser;
