import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
      email: '',
      password: '',
      error: '',
      loading: false,
  };
  
  onButtonPress = () => {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
          });
  }
  
  onLoginFail = () => {
    this.setState(this.setState({
      error: 'Authentication Failed',
      loading: false,
    })
    );
  }
  
  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }
  
  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button
        onPress={this.onButtonPress}
      >
        Log in
      </Button>
    );
  }
  
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label={'Email'}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder={'user@provider.com'}
          />
        </CardSection>
        <CardSection>
          <Input
            label={'Password'}
            placeholder={'password'}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
