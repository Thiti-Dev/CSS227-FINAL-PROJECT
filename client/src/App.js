import React, {Component} from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// ------------- Authentication ---------
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './redux/actions/authActions'
import PrivateRoute from './components/common/PrivateRoute'

// -------------- Redux -----------------
import { Provider } from 'react-redux';
import store from './redux/store';
// --------------------------------------

// ----------------- Page UI ----------------------
import IndexPage from './components/main-ui/pages/indexPage/IndexPage';
import RegisterPage from './components/main-ui/pages/registerPage/RegisterPage'
import LoginPage from './components/main-ui/pages/loginPage/LoginPage';
import EditProfile from './components/main-ui/pages/editProfile/EditProfile';
// ------------------------------------------------

// ----------------- UX ---------------------------
import "react-awesome-button/dist/styles.css";
import HomePage from './components/main-ui/pages/homePage/HomePage';
import InspectProfile from './components/main-ui/pages/inspectProfile/InspectProfile';
import Community from './components/main-ui/pages/communityPage/Community';
import CommunityPost from './components/main-ui/pages/communityPostPage/CommunityPost';
import Challenge from './components/main-ui/pages/challengePage/Challenge';
import NotfoundPage from './components/main-ui/pages/notFoundPage/NotFound';
// ------------------------------------------------

import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';

SmoothScrollbar.use(OverscrollPlugin);


//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //TODO : Clear current Profile
    //store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <PrivateRoute exact path="/home" component={HomePage} />
              <PrivateRoute exact path="/editProfile" component={EditProfile} />
              <PrivateRoute exact path="/profile/:profileId" component={InspectProfile} />
              <PrivateRoute exact path="/community" component={Community} />
              <PrivateRoute exact path="/community/:topic" component={CommunityPost} />
              <PrivateRoute exact path="/challenge" component={Challenge} />
              <Route exact path="*" component={NotfoundPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
