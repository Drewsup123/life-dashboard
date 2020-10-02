import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

export interface AppProps {
  
}

const App: React.SFC<AppProps> = () => {
  return (
    <div className="Application">
      <Switch>
        <Route exact path="/" render={() => <h1>home</h1>} />
        <Route path="/login" render={() => <h1>login</h1>} />
        <Route path="/finance" render={() => <h1>finance</h1>} />
        <Route path="/bucket-list" render={() => <h1>Bucket List</h1>} />
        <Route path="/notes" render={() => <h1>notes</h1>} />
        <Route path="/schedule" render={() => <h1>Schedule</h1>} />
        <Route path="/reminders" render={() => <h1>Reminders</h1>} />
        <Route path="/todo" render={() => <h1>Todo list</h1>} />
        <Route path="/overview" render={() => <h1>Overview</h1>} />
      </Switch>
    </div>
  );
}

export default App;
