import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Provider from './Provider';
import { dark } from './styles';

import Popup from './components/Popup';

const App = () => {
  return (
    <Provider>
      <ThemeProvider theme={dark}>
        <Router>
          <Switch>
            <Route path="/" render={props => <Popup />} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App;