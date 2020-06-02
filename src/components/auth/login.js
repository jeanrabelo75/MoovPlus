import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import movIcon from '../../assets/mov.png';
import {styles} from '../css/signup';

export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null, modalVisible: false};

  handleLogin = () => {
    const {email, password} = this.state;

    if (email === '' || password === '') {
      this.setState({modalVisible: true});
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Map'))
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
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <View style={styles.buttons}>
          <View style={styles.oneButton}>
            <Button title="Login" onPress={this.handleLogin} color="#1173D2" />
          </View>

          <View style={styles.buttons}>
            <Button
              color="#1173D2"
              title="Não Possui conta? Faça o cadastro!"
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Dados Inválidos</Text>

              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#1173D2'}}
                onPress={(modalVisible) =>
                  this.setState({modalVisible: false})
                }>
                <Text style={styles.textStyle}>Ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
