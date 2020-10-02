import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import Timer from './pages/Timer';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/timer' component={Timer} />
    </BrowserRouter>
  );
};

export default Routes;
