import React from 'react';
import { View,Dimensions,AsyncStorage,Alert,KeyboardAvoidingView,Image,StyleSheet,ActivityIndicator } from 'react-native';
import { Block, Button, Input,  Text} from 'galio-framework';
import theme from './src/theme';
import GalioApp from './routes';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    email: '',
    password: '',
    logueado: false,
    cargando: true,
    usuario_data: [],
    error: '',
    color_email: theme.COLORS.BLACK,
    color_email_place: theme.COLORS.MUTED,
    color_clave: theme.COLORS.BLACK,
    color_clave_place: theme.COLORS.MUTED,
  }
  componentWillMount(){
    //this.remove();
    this.retrieveData();
  }
  
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }
  
  loguear_me = async () => {
    this.setState({ error: "",color_email: theme.COLORS.BLACK, color_clave: theme.COLORS.BLACK, color_email_place: theme.COLORS.MUTED, color_clave_place: theme.COLORS.MUTED });
    //aqui poner la funcion api que traera los datos
    if(this.state.email==""){
      this.setState({ error: "El correo no puede ir vacio",color_email:theme.COLORS.ERROR, color_email_place: theme.COLORS.ERROR });
      return false;
    }else if(this.state.password==""){
      this.setState({ error: "La contraseña no puede ir vacia",color_clave:theme.COLORS.ERROR, color_clave_place: theme.COLORS.ERROR });
      return false;
    }else{

    }
    this.setState({ cargando: true });
    
    var email=this.state.email;
    var password=this.state.password;
    var dataSend = new FormData();
    dataSend.append('email', email);
    dataSend.append('password', password);
    return fetch(theme.COMPONENTS.URL_API+"ValidateUser", {
      method: 'POST',
      body: dataSend,
    })
    .then((response) => response.json())
    .then((resp) => {
      if(resp.datos.estado){
        this.setdatos(resp.datos);
      }
      this.retrieveData();
      this.setState({ error:resp.datos.descripcion });
    }).catch((error) => {
      console.error(error);
    });
  };
  
  setdatos = async (datos) =>{
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(datos));
     
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
        <View style={styles.cargando}>
          <ActivityIndicator size={theme.SIZES.BASE*2.5} color={theme.COLORS.ERROR} />
        </View>
      );
    }else if(this.state.logueado){
      return (
        <View style={{ flex: 1 }}>
          <GalioApp />
        </View>
      );
    }else {
      const error = this.state.error;
      return (
        <View style={{ flex: 1 }}>
          <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
            <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
              <Image
                style={{width: '60%', height: '30%',marginTop:'30%',marginBottom:'10%'}}
                source={require('./assets/logo.png')}
              />
              <Block flex={2} center space="evenly">
                <Text p muted style={styles.error}>{error}</Text>
                <Block flex={2}>
                  <Input
                    rounded
                    type="email-address"
                    placeholder="Correo"
                    autoCapitalize="none"
                    placeholderTextColor={this.state.color_email_place}
                    style={{ width: width * 0.9, borderColor: this.state.color_email }}
                    onChangeText={text => this.handleChange('email', text)}
                  />
                  <Input
                    rounded
                    password
                    viewPass
                    placeholder="Contraseña"
                    placeholderTextColor={this.state.color_clave_place}
                    style={{ width: width * 0.9, borderColor: this.state.color_clave }}
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
  error:{
    color: "red",
  },
  cargando:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});