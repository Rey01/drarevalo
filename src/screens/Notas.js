import React from 'react';
import {
  StyleSheet, ScrollView, Platform,Dimensions,View,ActivityIndicator,Linking
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { LinearGradient as Gradient } from 'expo';
// galio components
import {
  Button, Block,  NavBar, Card, Icon, Text
} from 'galio-framework';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED;

const { width } = Dimensions.get('screen');

class Notas extends React.Component {
  state = {
    cargando: true,
    new_cita: false,
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
    
    return fetch(theme.COMPONENTS.URL_API+"FetchNotas")
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
  renderHeader = () => (
    <NavBar
      title="Notas"
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
  openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }
  renderCard = (props, index) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
        <Block row center card shadow space="between" style={styles.card} key={props.id_nota}>
        <Gradient
          start={[0.45, 0.45]}
          end={[0.90, 0.90]}
          colors={gradientColors}
          style={[styles.gradient, styles.left]}
        >
          <Icon
            size={BASE_SIZE}
            name='list-bullet'
            color={COLOR_WHITE}
            family='Galio'
          />
        </Gradient>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{props.titulo}</Text>
          <Text size={BASE_SIZE * 0.875} muted>{props.descripcion}</Text>
        </Block>
        <Button style={styles.right} >
          <Icon size={BASE_SIZE} name="arrow-right" family="font-awesome" color={COLOR_GREY} />
        </Button>
      </Block>
    );
  }
  
  renderCards = () => this.state.cardsd.map((card, index) => this.renderCard(card, index))

  render() {
    if(this.state.cargando){
      return (
        <View style={styles.cargando}>
          <ActivityIndicator size={theme.SIZES.BASE*2.5} color={theme.COLORS.ERROR} />
        </View>
      );
    }else{
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        {/* header */}
        {this.renderHeader()}

        {/* cards */}
        <ScrollView >
          <Block flex space="between">
            {this.renderCards()}
          </Block>
        </ScrollView>
      </Block>
    );
              }
  }
}

const styles = StyleSheet.create({
  
  cargando:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.40,
  },
  cardFull: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
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

export default Notas;
