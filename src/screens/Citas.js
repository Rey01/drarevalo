import React from 'react';
import {
  StyleSheet, ScrollView, Platform,ActivityIndicator,View,AsyncStorage,Dimensions,Picker,Alert
} from 'react-native';
import { LinearGradient as Gradient } from 'expo';
import DatePicker from 'react-native-datepicker';
import Textarea from 'react-native-textarea';

import Promociones_modal from './Promociones_modal';
// galio components
import {
  Button, Block, Icon, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';

const { width,height } = Dimensions.get('screen');
const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';


class Citas extends React.Component {
  
  state = {
    cargando: true,
    new_cita: false,
    date:new Date(),
    horario:"",
    usuario: {
      correoElectronico: "",
      descripcion: "",
      estado: "",
      idAsignacionMembresia: "",
      idExpediente: "",
      nombreCompleto: "",
      telemedicina: "",
    },
    observacion: "",
    options:[],
    cardsd:[],
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('usuario');
      if(value !== null) {
        usuario = JSON.parse(value);
        this.setState({usuario});
        this.retrieveCitas();
      }else{
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  retrieveCitas = async () => {
    
    var idAsignacionMembresia=this.state.usuario.idAsignacionMembresia;
    var idExpediente=this.state.usuario.idExpediente;
    var dataSend = new FormData();
    dataSend.append('idAsignacionMembresia', idAsignacionMembresia);
    dataSend.append('idExpediente', idExpediente);
    return fetch(theme.COMPONENTS.URL_API+"FetchCitas?idAsignacionMembresia="+idAsignacionMembresia+"&idExpediente="+idExpediente, {
      method: 'POST',
      body: dataSend,
    })
    .then((response) => response.json())
    .then((resp) => {
      this.setState({cargando:false});
      this.setState({cardsd:resp.datos});
    }).catch((error) => {
      console.error(error);
    });
  };
  componentWillMount(){
    this.retrieveData();
    
  };
  regresar = async () => {
    this.setState({new_cita:false});
  };
  
  change_date = async ()  => {
    this.setState({cargando:true,new_cita:false});

    var fecha=this.state.date;
    var dataSend = new FormData();
    dataSend.append('idEspecialidad', 1);
    dataSend.append('idSucursal', 1);
    dataSend.append('fecha', fecha);
    dataSend.append('diaSemana', fecha);
    return fetch(theme.COMPONENTS.URL_API+"GetHorariosDisponibles", {
      method: 'POST',
      body: dataSend,
    })
    .then((response) => response.json())
    .then((resp) => {
      this.setState({cargando:false,new_cita:true});
      this.setState({options:resp.datos});
    }).catch((error) => {
      console.error(error);
    });
  };
  
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }
  
  crear_cita = async ()  => {
    this.setState({cargando:true,new_cita:false});

    var fecha=this.state.date;
    var idExpediente=this.state.usuario.idExpediente;
    var observacion=this.state.observacion;
    var horario=this.state.horario;
    var dataSend = new FormData();
    dataSend.append('idExpediente',idExpediente);
    dataSend.append('fechaReservacion', fecha);
    dataSend.append('horario', horario);
    dataSend.append('idEspecialidad', 1);
    dataSend.append('observaciones', observacion);
    dataSend.append('idSucursal', 1);
    return fetch(theme.COMPONENTS.URL_API+"GuardarCita", {
      method: 'POST',
      body: dataSend,
    })
    .then((response) => response.json())
    .then((resp) => {
      
     this.setState({date:new Date(),observacion:"",options:[] });
      Alert.alert('Datos guardados correctamente');
      this.retrieveCitas();
    }).catch((error) => {
      console.error(error);
    });
  };
  nueva_cita = async () => {
    this.setState({new_cita:true});
  };

  renderHeader2 = () => ( 
    <NavBar
      back
      title="Nueva Cita"
      onLeftPress={() => this.regresar()}
      leftIconColor={theme.COLORS.MUTED}
      size={BASE_SIZE}
      style={{ width, marginHorizontal: - (theme.SIZES.BASE - 2) }}
         
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
    />
  )
  renderHeader = () => ( 
    <NavBar
      title="Citas"
      onLeftPress={() => this.props.navigation.openDrawer()}
      leftIconColor={theme.COLORS.MUTED}
      size={BASE_SIZE*1.5}
      right={(
        <Button
          color="transparent"
          style={styles.settings}
          onPress={() => this.nueva_cita()}
        >
          <Icon size={BASE_SIZE*1.5} name="calendar-plus-o" family="font-awesome" color={theme.COLORS.PRIMARY} />
        </Button>
      )}
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
    />
  )

  

  renderCard = (props, index) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
      <Block row center card shadow space="between" style={styles.card} key={props.fechahora}>
        <Gradient
          start={[0.45, 0.45]}
          end={[0.90, 0.90]}
          colors={gradientColors}
          style={[styles.gradient, styles.left]}
        >
          <Icon
            size={BASE_SIZE}
            name="calendar"
            color={COLOR_WHITE}
            family="font-awesome"
          />
        </Gradient>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{props.fechahora}</Text>
          <Text size={BASE_SIZE * 0.875} muted>{props.title}</Text>
        </Block>
        <Button style={styles.right}>
          <Icon size={BASE_SIZE} name="arrow-right" family="font-awesome" color={COLOR_GREY} />
        </Button>
      </Block>
    );
  }

  renderCards = () => this.state.cardsd.map((card, index) => this.renderCard(card, index))

  render() {
    if(this.state.new_cita){
      var data = this.state.options;
      return (
        <Block flex={2} center space="evenly">
          {this.renderHeader2()}

          <ScrollView style={{ flex: 1 }}>
          <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >Fecha:</Text>
          <DatePicker
            style={{width: width*0.9}}
            date={this.state.date}
            mode="date"
            placeholder="Seleccione fecha"
            format="YYYY-MM-DD"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateInput: {
                borderRadius:20,
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date});this.change_date();}}
          />          
          <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >Tipo:</Text>

              <Picker
                style={{height: 50, width: width*0.9}} 
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({horario: itemValue})
                }>
                  { data.map((item, key)=>(
                    <Picker.Item label={item.horario} value={item.idHorario} key={item.idHorario} />)
                  )}
              </Picker>
              <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
              Observación:
              </Text>
               <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={text => this.handleChange('observacion', text)}
                defaultValue={this.state.observacion}
                maxLength={120}
                placeholder={'Observación'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
              <Button
                  round
                  color="error"
                  onPress={() => this.crear_cita()}
                  style={{ marginBottom: 300, width:width*0.9 }}
                >
                Guardar Cita
              </Button>
          </ScrollView>
        </Block>
      );
    }else if(this.state.cargando){
      return (
        <View style={styles.cargando}>
          <ActivityIndicator size={theme.SIZES.BASE*2.5} color={theme.COLORS.ERROR} />
        </View>
      );
    }else {
      return (
        <Block safe flex>
          {/* header */}
          {this.renderHeader()}

          {/* cards */}
          <ScrollView style={{ flex: 1 }}>
            {this.renderCards()}
          </ScrollView>
        </Block>
      );
    }
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.40,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    marginBottom:10,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    width:width*0.9,
    color: '#333',
  },
  cargando:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  left: {
    marginRight: BASE_SIZE,
  },
  right: {
    width: BASE_SIZE * 2,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  gradient: {
    width: BASE_SIZE * 3.25,
    height: BASE_SIZE * 3.25,
    borderRadius: BASE_SIZE * 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Citas;
