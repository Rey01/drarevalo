import React from 'react';
import {
  StyleSheet, ScrollView, Platform,AsyncStorage,ActivityIndicator,View
} from 'react-native';

import { LinearGradient as Gradient } from 'expo';
// galio components
import {
  Button, Block, Icon, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';


const BASE_SIZE = theme.SIZES.BASE;


const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';


class Examenes extends React.Component {
  
  state = {
    cargando: true,
    usuario: {
      correoElectronico: "",
      descripcion: "",
      estado: "",
      idAsignacionMembresia: "",
      idExpediente: "",
      nombreCompleto: "",
      telemedicina: "",
    },
    cardsd:[]
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
    return fetch(theme.COMPONENTS.URL_API+"GetExalemenesLaboratorio?idAsignacionMembresia="+idAsignacionMembresia+"&idExpediente="+idExpediente, {
      method: 'POST',
      body: dataSend,
    })
    .then((response) => response.json())
    .then((resp) => {
      console.log(resp.datos);
      this.setState({cargando:false});
      this.setState({cardsd:resp.datos});
    }).catch((error) => {
      console.error(error);
    });
  };
  componentWillMount(){
    this.retrieveData();
  };

  
  renderCard = (props, index) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
      <Block row center card shadow space="between" style={styles.card} key={props.idExamen}>
        <Gradient
          start={[0.45, 0.45]}
          end={[0.90, 0.90]}
          colors={gradientColors}
          style={[styles.gradient, styles.left]}
        >
          <Icon
            size={BASE_SIZE}
            name="list-alt"
            color={COLOR_WHITE}
            family="font-awesome"
          />
        </Gradient>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{props.nombreExamen}</Text>
          <Text size={BASE_SIZE * 0.875} muted>{props.nombreArchivo}</Text>
        </Block>
        <Button style={styles.right}>
          <Icon size={BASE_SIZE} name="arrow-right" family="font-awesome" color={COLOR_GREY} />
        </Button>
      </Block>
    );
  }

  renderCards = () => this.state.cardsd.map((card, index) => this.renderCard(card, index))

  
  renderHeader = () => (
    <NavBar
      title="Examenes"
      onLeftPress={() => this.props.navigation.openDrawer()}
      leftIconColor={theme.COLORS.MUTED}
      right={(
        <Button
          color="transparent"
          style={styles.settings}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon size={BASE_SIZE*1.5} name="plus" family="font-awesome" color={theme.COLORS.ERROR} />
        </Button>
      )}
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
    />
  )

  

  render() {
    if(this.state.cargando){
      return (
        <View style={styles.cargando}>
          <ActivityIndicator size={theme.SIZES.BASE*2.5} color={theme.COLORS.ERROR} />
        </View>
      );
    }else{
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
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  }, card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.40,
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

export default Examenes;
