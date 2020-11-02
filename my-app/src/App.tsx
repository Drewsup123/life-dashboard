import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from './store';
import SideBar from './components/SideBar/SideBar';
import SideBarMin from './components/SideBar/SideBarMin';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { AnimatePresence } from "framer-motion";
const Profile = lazy(() => import("./routes/Profile"));
const BucketList = lazy(() => import("./routes/BucketList"));
const Finance = lazy(() => import("./routes/Finance"));
const LandingPage = lazy(() => import("./routes/LandingPage"));
const Login = lazy(() => import("./routes/Login"));
const Signup = lazy(() => import("./routes/Signup"));
const Notes = lazy(() => import("./routes/Notes"));
const Overview = lazy(() => import("./routes/Overview"));
const Reminder = lazy(() => import("./routes/Reminder"));
const Schedule = lazy(() => import("./routes/Schedule"));
const Todo = lazy(() => import("./routes/Todo"));
const Subscription = lazy(() => import("./routes/Subscription"));
const Life_Calendar = lazy(() => import("./routes/LifeCalendar.jsx"));
const Journal = lazy(() => import("./routes/Journal"));
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
      }, 100)
    }
  }, [open])

  return (
    <div className={`App${isAuthenticated&&"-authenticated"}`}>
      {isAuthenticated ? (showToggle ? <SideBarMin /> : <SideBar />) : <NavigationBar />}
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch>
          <Route render={({location}) => (
            <div className={`content-area${isAuthenticated ? (open ? "-open" : "-min") : "-base"}`}>
              <Suspense fallback={<div>Cacheing page</div>}>
                <Route exact path="/" render={() => <LandingPage />} />
                <Route path="/signup" render={() => <Signup />} />
                <Route path="/login" render={() => <Login />} />
                {/* Authenticated Routes */}
                {isAuthenticated&&(
                  <React.Fragment>
                    <Route path="/finance" render={() => <Finance />} />
                    <Route path="/bucket-list" render={() => <BucketList />} />
                    <Route path="/notes" render={() => <Notes />} />
                    <Route path="/schedule" render={() => <Schedule />} />
                    <Route path="/reminders" render={() =><Reminder />} />
                    <Route path="/todo" render={() => <Todo />} />
                    <Route path="/overview" render={() => <Overview />} />
                    <Route path="/profile" render={() => <Profile />} />
                    <Route path="/subscription" render={() => <Subscription />} />
                    <Route path="/life-calendar" render={() => <Life_Calendar />} />
                    <Route path="/journal" render={() => <Journal />} />
                  </React.Fragment>
                )}
                <Route path="/invalid-route" render={() => <InvalidRoute />} />
              </Suspense>
            </div>
          )}/>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.User.isAuthenticated,
  open: state.Application.sideBarOpen
})

export default connect(mapStateToProps, {})(App);