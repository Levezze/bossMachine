import React from 'react';
import { Outlet } from 'react-router-dom';
import Heading from './Heading';

const App = () => {
  return (
    <div>
      <Heading />
      <div id="content">
        <Outlet />  {/* ✅ This replaces `{children}` in React Router v6 */}
      </div>
    </div>
  );
};

export default App;
