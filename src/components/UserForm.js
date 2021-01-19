import React, { useState, useEffect } from 'react';

import Header from './Header';

const UserForm = ({
  userName: externalUserName,
  initialUserName = externalUserName || '',
  onSubmit,
}) => {
  const [userName, setUserName] = useState(initialUserName);

  useEffect(() => {
    if (typeof externalUserName === 'string') setUserName(externalUserName);
  }, [externalUserName]);

  const handleChange = (e) => setUserName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userName);
  };

  return (
    <Header>
      <form className="flex w-full justify-center" onSubmit={handleSubmit}>
        <input
          className="shadow border border-gray-200 rounded px-4 py-2"
          placeholder="Busque por username..."
          value={userName}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-4 py-3 border rounded text-gray-800 border-gray-400 hover:border-transparent hover:bg-gray-800 hover:text-white ml-2"
          disabled={!userName.length}
        >
          Pesquisar
        </button>
      </form>
    </Header>
  );
};

export default UserForm;
