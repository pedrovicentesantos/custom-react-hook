import React, { useState, useEffect, useReducer } from 'react';

import UserForm from './components/UserForm';
import UserFallBack from './components/UserFallBack';
import UserView from './components/UserView';

import fetchGithubUser from './utils/fetchGithubUser';
import REQUEST_STATUS from './utils/utils';

const reducer = (state, action) => {
  switch (action.status) {
    case REQUEST_STATUS.PENDING:
      return {
        status: REQUEST_STATUS.PENDING,
        data: null,
        error: null,
      };

    case REQUEST_STATUS.RESOLVED:
      return {
        status: REQUEST_STATUS.RESOLVED,
        data: action.data,
        error: null,
      };

    case REQUEST_STATUS.REJECTED:
      return {
        status: REQUEST_STATUS.REJECTED,
        data: null,
        error: action.error,
      };

    default:
      throw Error(`Unhandled status: ${action.status}`);
  }
};

const UserInfo = ({ userName }) => {
  const initialState = {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, data, error } = state;

  useEffect(() => {
    if (!userName) return;
    dispatch({ status: REQUEST_STATUS.PENDING });
    fetchGithubUser(userName, dispatch);
  }, [userName]);

  switch (status) {
    case REQUEST_STATUS.IDLE:
      return 'Entre com um username';

    case REQUEST_STATUS.PENDING:
      return <UserFallBack userName={userName} />;

    case REQUEST_STATUS.RESOLVED:
      return <UserView user={data} />;

    case REQUEST_STATUS.REJECTED:
      return (
        <div className="text-center">
          There was an error
          <pre style={{ whiteSpace: 'normal' }}>{error}</pre>
        </div>
      );

    default:
      throw Error(`Unhandled status: ${status}`);
  }
};

const UserSection = ({ userName }) => (
  <div>
    <div className="flex justify-center ">
      <UserInfo userName={userName} />
    </div>
  </div>
);

const App = () => {
  const [userName, setUserName] = useState(null);
  const handleSubmit = (newUserName) => setUserName(newUserName);
  const handleSelect = (newUserName) => setUserName(newUserName);

  return (
    <div>
      <UserForm userName={userName} onSubmit={handleSubmit} />
      <hr />
      <div className="m-4">
        <UserSection key={userName} onSelect={handleSelect} userName={userName} />
      </div>
    </div>
  );
};

export default App;
