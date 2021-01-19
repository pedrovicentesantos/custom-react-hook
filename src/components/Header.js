import React from 'react';

const Header = ({ children }) => (
  <nav className="bg-white shadow px-48 border-b">
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div className="mx-auto my-4">{children}</div>
    </div>
  </nav>
);

export default Header;
