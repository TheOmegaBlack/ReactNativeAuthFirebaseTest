import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import LoginForm from './components/login_form';
import { Header } from './components/common';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCzuPLhWrkIk9cheCrgQbgNQcYlxPuojRA',
      authDomain: 'authentication-18973.firebaseapp.com',
      databaseURL: 'https://authentication-18973.firebaseio.com',
      projectId: 'authentication-18973',
      storageBucket: 'authentication-18973.appspot.com',
      messagingSenderId: '1051911619023'
    });
  }
  
  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        <LoginForm />
      </View>
    );
  }
}

export default App;
