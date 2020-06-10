import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, Modal } from 'react-native';

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
    this.state = {modalVisible: false, msg: ""};
  }

  state = {
    modalVisible: false,
    msg: ""
  };

  setModalVisible(visible, msg) {
    this.setState({ modalVisible: visible, msg: msg });
  }


  register = () => {
      const value = this._form.getValue();

      let res = axios.post(`${API_URL}/grdn/api/blockchain/registerVoter`, {
        voterId: value.id,
        registrarId: 1,
        firstName: value.name,
        lastName: value.surname
      })
      .then( (response) => {
        if (response.data.error == undefined) {
          // RegisterScreen.setModalVisible(true, "Se ha registrado exitosamente");
          this.setState({ modalVisible: true, msg: "Se ha registrado exitosamente" });
          console.log('user successfully signed up!: ')
        }
        else {
          // RegisterScreen.setModalVisible(true, "El usuario ya se encuentra registrado");
          this.setState({ modalVisible: true, msg: "El usuario ya se encuentra registrado" });
        }
      })
      .catch(function (error) {
        console.log('error signing up: ', error);
      });
  }

  render() {
    const { modalVisible, msg } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>{msg}</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible, "");
                }}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  }
})