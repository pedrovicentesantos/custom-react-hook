import React, { useState } from 'react';

import UserForm from './components/UserForm';
import UserFallBack from './components/UserFallBack';
import UserView from './components/UserView';

import fetchGithubUser from './utils/fetchGithubUser';
import { REQUEST_STATUS } from './utils/utils';
import useAsync from './utils/useAsync';

const UserInfo = ({ userName }) => {
  const initialRequestState = userName ? REQUEST_STATUS.PENDING : REQUEST_STATUS.IDLE;

  const {
    status, error, data,
  } = useAsync({ status: initialRequestState }, userName, fetchGithubUser);

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
        <UserSection onSelect={handleSelect} userName={userName} />
      </div>
    </div>
  );
};

export default App;
