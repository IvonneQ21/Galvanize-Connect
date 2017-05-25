import React, { Component } from 'react';
import GoogleAuthentication from './components/GoogleAuth/GoogleAuth';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Cohort from './Views/Cohort';
import Profile from './Views/Profile';
import Home from './Views/Home';
import './App.css';
import firebase from 'firebase';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
    Sidebar,
    Button,
    Menu,
    Image,
    Icon,
    Header,
} from 'semantic-ui-react';


injectTapEventPlugin();
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBcZY-ngAyYe9-gw5z_A0_k6so4BPsJ8V0',
      authDomain: 'galvanize-connect-cfd11.firebaseapp.com',
      databaseURL: 'https://galvanize-connect-cfd11.firebaseio.com',
      projectId: 'galvanize-connect-cfd11',
      storageBucket: 'galvanize-connect-cfd11.appspot.com',
      messagingSenderId: '836129324682',
    };
    firebase.initializeApp(config);
  }
  render() {
    const { name } = this.props.userData;
        // console.log(name, 'me mayne');
    return (
      <Router class="ui five item menu">
        <div>
          <Sidebar as={Menu} animation="push" width="thin" visible icon="labeled" vertical inverted>

            <Menu.Item name="home">
              <Link to="/Home">
                <Icon name="home" size="medium" />
                <h3>
                              Home
                            </h3>
              </Link>
            </Menu.Item>
            <Menu.Item name="cohort">
              <Link to="/Cohort">
                <Icon name="users" size="medium" />
                <h3>
                              Cohort
                            </h3>
              </Link>
            </Menu.Item>
            <Menu.Item name="profile">
              <Link to="/Profile">
                <Icon name="user" size="medium" />
                <h3>
                                  Profile
                                </h3>
              </Link>
            </Menu.Item>

            <Menu.Item name="login">
              <Link to="/">
                <Icon name="sign in" size="medium" />
                <h3>
                              Login
                            </h3>
              </Link>
            </Menu.Item>
          </Sidebar>
          <Route
            path="/Home" render={() => (!name
                        ? (<Redirect to="/Login" />)
                        : (<Home />))}
          />
          <Route path="/Login" component={GoogleAuthentication} />
          <Route
            exact path="/" render={() => (name
                        ? (<Redirect to="/Home" />)
                        : (<Redirect to="/Login" />))}
          />
          <Route
            path="/Cohort" render={() => (!name
                        ? (<Redirect to="/Login" />)
                        : (<Cohort />))}
          />
          <Route
            path="/Profile" render={() => (!name
                        ? (<Redirect to="/Login" />)
                        : (<Profile />))}
          />
        </div>
      </Router>
    );
  }

}

const mapStateToProps = ({ userData }) => ({ userData });
export default connect(mapStateToProps)(App);
