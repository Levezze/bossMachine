import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store/index';

import App from './components/App';
import AllMinions from './components/AllMinions';
import Home from './components/Home';
import AllIdeas from './components/AllIdeas';
import Idea from './components/Idea';
import Minion from './components/Minion';

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="minions" element={<AllMinions />} />
          <Route path="minions/new" element={<Minion newMinion={true} />} />
          <Route path="minions/:id" element={<Minion />} />
          <Route path="ideas" element={<AllIdeas />} />
          <Route path="ideas/new" element={<Idea />} />
          <Route path="ideas/:id" element={<Idea />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
