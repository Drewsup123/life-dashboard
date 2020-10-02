import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

export interface AppProps {
  
}

const App: React.SFC<AppProps> = () => {
  return (
    <div className="Application">
      <Switch>
        <Route exact path="/" render={() => <h1>home</h1>} />
      </Switch>
    </div>
  );
}

export default App;
