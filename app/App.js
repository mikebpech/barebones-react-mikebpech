import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/" render={props => <p>hi</p>} />
        </Switch>
      </Router>
      <Footer />
    </Provider>
  )
}

export default App;