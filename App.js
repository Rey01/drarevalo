import React from 'react';
import { View, StatusBar,AsyncStorage } from 'react-native';

import GalioApp from './routes';
import Login from './src/screens/Login';

export default class App extends React.Component {

  state = {
    logueado: false,
    usuario_data: [],
  }
  componentWillMount(){
    this.remove();
    this.retrieveData();
  }
  remove = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      
    } catch (error) {
      console.log(error);
    }
  };

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('usuario');
      if (value !== null) {
        this.setState({ logueado: true });
        this.setState({ usuario_data: value });
        return value;
      }else{
        this.setState({ logueado: false });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  render() {
    if(this.state.logueado){
      return (
        <View style={{ flex: 1 }}>
          <GalioApp />
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1 }}>
          <Login />
          <StatusBar backgroundColor="blue" barStyle="light-content" />
        </View>
      );
    }
   
  }
}