import React from 'react';
import {
  StyleSheet, ScrollView, Platform,Dimensions,Picker,AsyncStorage,View,ActivityIndicator,Alert
} from 'react-native';
import Textarea from 'react-native-textarea';
// galio components
import {
  Button, Block, Input, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;


const { height, width } = Dimensions.get('window');
class Citas extends React.Component {
  state = {
    cargando:true,
    nombre: '',//
    apellido: '',//
    sexo: '',//
    fecha_nacimiento: '',//
    esta_civil: '',//
    tipo_documento: '',//
    documento: '',//
    correo: '',//
    telefono_domiciliar: '',//
    telefono_celular: '',//
    telefono_oficina: '',//
    direccion: '',
    usuario: {
      correoElectronico: "",
      descripcion: "",
      estado: "",
      idAsignacionMembresia: "",
      idExpediente: "",
      nombreCompleto: "",
      telemedicina: "",
    },
  }
  
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('usuario');
      if(value !== null) {
        usuario = JSON.parse(value);
        this.setState({usuario});
        this.retrieveExpediente();
      }else{
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  retrieveExpediente = async () => {
    
    var idExpediente=this.state.usuario.idExpediente;
    return fetch(theme.COMPONENTS.URL_API+"GetDetallesTitular?idExpediente="+idExpediente)
    .then((response) => response.json())
    .then((resp) => {
      this.setState({cargando:false});
      this.setState({
        nombre: resp.datos.nombre,
        apellido: resp.datos.apellido,
        sexo: resp.datos.sexo,
        fecha_nacimiento: resp.datos.fechaNacimiento,
        esta_civil: resp.datos.estadoCivil,
        tipo_documento: resp.datos.tipodocumento,
        documento: resp.datos.numeroDocumento,
        correo: resp.datos.email,
        telefono_domiciliar: resp.datos.telDomicilio,
        telefono_celular: resp.datos.telCelular,
        telefono_oficina: resp.datos.telOficina,
        direccion: resp.datos.domicilio,
      });
      
    }).catch((error) => {
      console.error(error);
    });
  };
  componentWillMount(){
    this.retrieveData();
  };

  renderHeader = () => (
    <NavBar
      title="Cuenta"
      onLeftPress={() => this.props.navigation.openDrawer()}
      leftIconColor={theme.COLORS.MUTED}
      right={(
        <Button
          color="transparent"
          style={styles.settings}
          onPress={() => this.props.navigation.openDrawer()}
        >
        </Button>
      )}
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
    />
  )

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }
  
  actualizar_datos = async () => {
    
    this.setState({cargando:true});
    var dataSend = new FormData();
    dataSend.append('nombre', this.state.nombre);
    dataSend.append('apellido', this.state.apellido);
    dataSend.append('sexo', this.state.sexo);
    dataSend.append('fechaNacimiento', this.state.fecha_nacimiento);
    dataSend.append('estadoCivil', this.state.esta_civil);
    dataSend.append('idTipoDocumento', this.state.tipo_documento);
    dataSend.append('numeroDocumento', this.state.documento);
    dataSend.append('correoElectronico', this.state.correo);
    dataSend.append('telefonoCasa', this.state.telefono_domiciliar);
    dataSend.append('telefono_celular', this.state.telefono_celular);
    dataSend.append('telOficina', this.state.telefono_oficina);
    dataSend.append('domicilio', this.state.direccion);
    dataSend.append('idExpediente', this.state.usuario.idExpediente);
    
    return fetch(theme.COMPONENTS.URL_API+"UpdatePerfil", {
      method: 'POST',
      body: dataSend,
    })
    .then((response) => response.json())
    .then((resp) => {
      this.setState({cargando:false});
      if(resp.datos){
        Alert.alert('Datos guardados correctamente');
      }else{
        Alert.alert('Datos guardados correctamente');
      }
    }).catch((error) => {
      console.error(error);
    });
    console.log(this.state);
  }

  render() {
    value = this.state
    if(this.state.cargando){
      return (
        <View style={styles.cargando}>
          <ActivityIndicator size={theme.SIZES.BASE*2.5} color={theme.COLORS.ERROR} />
        </View>
      );
    }else{
    return (
      <Block flex={2} center space="evenly">
        {/* header */}
        {this.renderHeader()}

        {/* cards */}
        <ScrollView style={{ flex: 1 }}>
          <Block flex={2}>
                <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Nombre:
                </Text>
              <Input
                rounded
                type="default"
                placeholder="Nombre"
                value={value.nombre}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('nombre', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Apellido:
                </Text>
              <Input
                rounded
                type="default"
                placeholder="Apellido"
                value={value.apellido}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('apellido', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Sexo:
                </Text>
               {/* aqui debe ir sexo */}
               <Picker
                selectedValue={this.state.sexo}
                style={{height: 50, width: width*0.9}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({sexo: itemValue})
                }>
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
              </Picker>
               <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Fecha de Nacimiento:
                </Text>
              <Input
                rounded
                type="default"
                placeholder="Fecha Nacimiento"
                value={value.fecha_nacimiento}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('fecha_nacimiento', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Estado Civil:
                </Text>
               {/* aqui debe ir estado civil */}
               <Picker
                selectedValue={this.state.esta_civil}
                style={{height: 50, width: width*0.9}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({esta_civil: itemValue})
                }>
                <Picker.Item label="Soltero/a" value="1" />
                <Picker.Item label="Casado/a" value="2" />
                <Picker.Item label="Viudo/a" value="3" />
                <Picker.Item label="Divorciado/a" value="4" />
              </Picker>
               <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Tipo de Documento:
                </Text>
               {/* aqui debe ir tipo documento */}
               <Picker
                selectedValue={this.state.tipo_documento}
                style={{height: 50, width: width*0.9}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({tipo_documento: itemValue})
                }>
                <Picker.Item label="DUI" value="1" />
                <Picker.Item label="NIT" value="2" />
                <Picker.Item label="Pasaporte" value="3" />
                <Picker.Item label="Otros" value="4" />
              </Picker>
               <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Numero de Documento:
                </Text>
              <Input
                rounded
                type="default"
                placeholder="Documento Unico"
                value={value.documento}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('documento', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Correo:
                </Text>
              <Input
                rounded
                type="default"
                placeholder="Correo"
                value={value.correo}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('correo', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
              Teléfono Domiciliar:
                </Text>
              <Input
                rounded
                type="default"
                placeholder="Teléfono Domiciliar"
                value={value.telefono_domiciliar}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('telefono_domiciliar', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                Teléfono Celular:
              </Text>
              <Input
                rounded
                type="default"
                placeholder="Teléfono Celular"
                value={value.telefono_celular}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('telefono_celular', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                Teléfono Oficina:
              </Text>
              <Input
                rounded
                type="default"
                placeholder="Teléfono Oficina"
                value={value.telefono_oficina}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('telefono_oficina', text)}
              />
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
              Dirección:
              </Text>
               <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.onChange}
                defaultValue={value.direccion}
                maxLength={120}
                placeholder={'Dirección'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
              <Button
                  round
                  color="error"
                  onPress={() => this.actualizar_datos()}
                  style={{ marginBottom: 300, width:width*0.9 }}
                >
                Actualizar
              </Button>
            </Block>
        </ScrollView>
      </Block>
    );
    }
  }
}

const styles = StyleSheet.create({
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 4,
    borderColor: 'transparent',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    marginBottom:10,
    backgroundColor: '#F5FCFF',
  },
  cargando:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    width:width*0.9,
    color: '#333',
  },
});

export default Citas;
