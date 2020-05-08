import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>GRDN</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Número de identificación" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({id:text})}
            idValue = {this.state.id}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Contraseña" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}
            pswValue = {this.state.password}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Index')}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signupText}>Registrarse</Text>
        </TouchableOpacity>
  
  
      </View>
    );
  }
}

function Info({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Info screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const InfoStack = createStackNavigator();

function InfoStackScreen() {
  return (
    <InfoStack.Navigator screenOptions={{ headerShown: false }}>
      <InfoStack.Screen name="Login" component={InfoScreen} />
      <InfoStack.Screen name="Index" component={Info} />
    </InfoStack.Navigator>
  );
}

export default InfoStackScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#1F007E",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#ededed",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"black",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#1F007E",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  signupText:{
    color:"black"
  }
});