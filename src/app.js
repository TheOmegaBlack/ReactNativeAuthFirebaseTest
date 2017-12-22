import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text } from 'react-native';
import LoginForm from './components/login_form';
import { Header, Button, Spinner, CardSection } from './components/common';

class App extends Component {
  state = {
    loggedIn: null
  }
  
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCzuPLhWrkIk9cheCrgQbgNQcYlxPuojRA',
      authDomain: 'authentication-18973.firebaseapp.com',
      databaseURL: 'https://authentication-18973.firebaseio.com',
      projectId: 'authentication-18973',
      storageBucket: 'authentication-18973.appspot.com',
      messagingSenderId: '1051911619023'
    });
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  
  renderContent = () => {
    console.log(this.state.loggedIn);
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
              <Text style={styles.loggedInText}>Logged In!</Text>
            <CardSection>
            <Button
              onPress={() => firebase.auth().signOut()}
            >
              Log Out
            </Button>
            </CardSection>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }
  
  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  loggedInText: {
    alignSelf: 'center',
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 5
  }
};

export default App;
