import React from 'react';
import {
  StyleSheet, ScrollView, Platform,Dimensions,View,ActivityIndicator
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
// galio components
import {
  Button, Block, Icon,  NavBar, Card,Text
} from 'galio-framework';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ['#6B84CA', '#8F44CE'];
const GRADIENT_PINK = ['#D442F8', '#B645F5', '#9B40F8'];

const { width } = Dimensions.get('screen');

class Citas extends React.Component {
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
    
    return fetch(theme.COMPONENTS.URL_API+"FetchPromociones")
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
      title="Promociones"
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
  renderCard = (props, index) => {
    const gradientColors = index % 2 ? GRADIENT_BLUE : GRADIENT_PINK;

    return (
      <Block flex space="between" style={styles.cards} key={props.id_promocion}>
        <Card
          flex
          borderless
          shadowColor={theme.COLORS.BLACK}
          style={styles.card}
          title={props.titulo}
          titleColor={theme.COLORS.WHITE}
          caption={props.descripcion}
          footerStyle={styles.cardFull}
          imageStyle={{ height: theme.SIZES.BASE * 13.75 }}
          image={props.imagen}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.cardGradient} />
        </Card>
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
    borderWidth: 0,
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
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
});

export default Citas;
