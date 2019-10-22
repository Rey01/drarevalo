import React from 'react';
import { View,Dimensions,AsyncStorage,Alert,KeyboardAvoidingView, Image,StyleSheet } from 'react-native';
import { Block, Button, Input,  Text} from 'galio-framework';
import theme from './src/theme';
import GalioApp from './routes';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    email: '-',
    password: '-',
    logueado: false,
    cargando: true,
    usuario_data: [],
  }
  componentWillMount(){
    this.retrieveData();
  }
  
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }
  
  loguear_me = async () => {
    this.setState({ cargando: true });

    //aqui poner la funcion api que traera los datos
    try {
      await AsyncStorage.setItem('usuario', 'I like to save it.');
      this.retrieveData();
    } catch (error) {
      // Error saving data
    }
  };

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
      this.setState({ cargando: false });
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
    if(this.state.cargando){
      return (
        <View style={{ flex: 1 }}>
          <Text>Cargando........</Text>
        </View>
      );
    }else if(this.state.logueado){
      return (
        <View style={{ flex: 1 }}>
          <GalioApp />
        </View>
      );
    }else {
      return (
        <View style={{ flex: 1 }}>
          <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
              <Image
                style={{width: '60%', height: '30%',marginTop:'30%',marginBottom:'10%'}}
                source={require('./assets/logo.png')}
              />
              <Block flex={2} center space="evenly">
                <Block flex={2}>
                  <Input
                    rounded
                    type="email-address"
                    placeholder="Correo"
                    autoCapitalize="none"
                    style={{ width: width * 0.9 }}
                    onChangeText={text => this.handleChange('email', text)}
                  />
                  <Input
                    rounded
                    password
                    viewPass
                    placeholder="Contraseña"
                    style={{ width: width * 0.9 }}
                    onChangeText={text => this.handleChange('password', text)}
                  />
                  <Text
                    color={theme.COLORS.ERROR}
                    size={theme.SIZES.FONT * 0.75}
                    onPress={() => Alert.alert('En desarrollo')}
                    style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                </Block>
                <Block flex middle>
                    <Button
                      round
                      color="error"
                      onPress={() => this.loguear_me()}
                    >
                    Iniciar sesión
                  </Button>
                </Block>
              </Block>
            </KeyboardAvoidingView>
          </Block>
        
        </View>
      );
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});