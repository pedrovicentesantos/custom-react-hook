import React, { useRef } from 'react';
import UserView from './UserView';

const UserFallBack = ({ userName }) => {
  const initialName = useRef(userName).current;
  const fallbackData = {
    followers: 0,
    public_repos: 0,
    name: initialName,
    bio: 'carregando...',
    avatar_url: '/img/github.png',
  };

  return <UserView user={fallbackData} />;
};

export default UserFallBack;
