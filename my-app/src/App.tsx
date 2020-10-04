import React, { Suspense, lazy } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from './store';
import SideBar from './components/SideBar/SideBar';
import SideBarMin from './components/SideBar/SideBarMin';
const Profile = lazy(() => import("./routes/Profile"));
const BucketList = lazy(() => import("./routes/BucketList"));
const Finance = lazy(() => import("./routes/Finance"));
const LandingPage = lazy(() => import("./routes/LandingPage"));
const Login = lazy(() => import("./routes/Signup"));
const Signup = lazy(() => import("./routes/Signup"));
const Notes = lazy(() => import("./routes/Notes"));
const Overview = lazy(() => import("./routes/Overview"));
const Reminder = lazy(() => import("./routes/Reminder"));
const Schedule = lazy(() => import("./routes/Schedule"));
const Todo = lazy(() => import("./routes/Todo"));
const Subscription = lazy(() => import("./routes/Subscription"));
const InvalidRoute = lazy(() => import("./routes/InvalidRoute"));

export interface AppProps {
  open: boolean;
  isAuthenticated: boolean;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { open, isAuthenticated } = props;
  const [showToggle, setShowToggle] = React.useState(true);

  React.useEffect(() => {
    if(open){setShowToggle(false)}
    else{
      setTimeout(() => {
        setShowToggle(true);
      }, 500)
    }
  }, [open])

  return (
    <div className="Application">
      <Switch>
        {showToggle ? <SideBarMin /> : <SideBar />}
        <Suspense fallback={<div>Cacheing page</div>}>
          <Route exact path="/" render={() => <LandingPage />} />
          <Route path="/signup" render={() => <Signup />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/finance" render={() => <Finance />} />
          <Route path="/bucket-list" render={() => <BucketList />} />
          <Route path="/notes" render={() => <Notes />} />
          <Route path="/schedule" render={() => <Schedule />} />
          <Route path="/reminders" render={() =><Reminder />} />
          <Route path="/todo" render={() => <Todo />} />
          <Route path="/overview" render={() => <Overview />} />
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/subscription" render={() => <Subscription />} />
          <Route path="/invalid-route" render={() => <InvalidRoute />} />
          {/* <Route path="*" render={() => <Redirect to="/invalid-route" />} /> */}
        </Suspense>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  open: state.applicationReducer.sideBarOpen
})

export default connect(mapStateToProps, {})(App);