import React from 'react';
import {StyleSheet, Text, TextInput, View, Button, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import movIcon from '../../assets/mov.png';

export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};

  handleSignUp = () => {
    const {email, password} = this.state;

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => this.props.navigation.navigate('Map'))
      .catch((error) => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={movIcon} style={styles.iconStyle} />
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <View style={styles.buttons}>
          <View style={styles.oneButton}>
            <Button
              title="Cadastre-se"
              onPress={this.handleSignUp}
              color="#1173D2"
            />
          </View>

          <View style={styles.buttons}>
            <Button
              color="#1173D2"
              title="Já possui conta? Faça o Login"
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },

  textInput: {
    height: 40,
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 10,
    color: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
  },

  iconStyle: {},

  buttons: {
    marginTop: 10,
  },

  oneButton: {
    margin: 10,
  },
});
