import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import Timer from './pages/Timer';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/timer/:workingDefaultTime,:restingDefaultTime,:numberOfSections' 
        render={(props) => 
          <Timer 
            workingDefaultTime={props.match.params.workingDefaultTime}
            restingDefaultTime={props.match.params.restingDefaultTime}
            numberOfSections={props.match.params.numberOfSections} 
          />
        }
      />
    </BrowserRouter>
  );
};

export default Routes;
