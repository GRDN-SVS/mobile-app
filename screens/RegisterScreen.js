import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import User from '../models/user';
import { options } from '../models/user';
import Colors from '../constants/Colors';
import { API_URL } from '../env';
import * as axios from 'react-native-axios'

var t = require('tcomb-form-native')

var Form = t.form.Form;
 
export default class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  register = () => {
      const value = this._form.getValue();

      axios.post(`${API_URL}/grdn/api/blockchain/registerVoter`, {
        voterId: value.id,
        registrarId: 1,
        firstName: value.name,
        lastName: value.surname
      })
      .then(function(response) {
        if (response['error'] == undefined) {
          console.log('user successfully signed up!: ')
        }
      })
      .catch(function (error) {
        console.log('error signing up: ', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={res => this._form = res}
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.register} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})