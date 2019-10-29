import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, StyleSheet, ScrollView, SafeAreaView, Platform,AsyncStorage
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';

// screens
import Article from './src/screens/Article';
import ArticleCover from './src/screens/ArticleCover';
import Cards from './src/screens/Cards';
import Components from './src/screens/Components';
import News from './src/screens/News';
import OrderConfirmed from './src/screens/OrderConfirmed';
import Presentation from './src/screens/Presentation';
import Dashboard from './src/screens/Dashboard';
import Register from './src/screens/Register';
import Registerv2 from './src/screens/Registerv2';
import Grid from './src/screens/Grid';
import Citas from './src/screens/Citas';

import theme from './src/theme';
import { Block, Icon, Text } from 'galio-framework';


class Usuario extends React.Component {

  state = {
    usuario: {
      correoElectronico: "",
      descripcion: "",
      estado: "",
      idAsignacionMembresia: "",
      idExpediente: "",
      nombreCompleto: "",
      telemedicina: "",
    }
  }
  
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('usuario');
      if(value !== null) {
        usuario = JSON.parse(value);
        this.setState({usuario});
      }else{
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentWillMount(){
    this.retrieveData();
  };
  render() {
    state  = this.state;
    console.log(state.usuario.nombreCompleto);
    return (
      <Text size={theme.SIZES.FONT * 0.875}>{state.usuario.nombreCompleto} </Text>
    );
  }
}

const GalioDrawer = props => (
  <SafeAreaView style={styles.drawer} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block space="between" row style={styles.header}>
      <Block flex={0.3}><Image source={{ uri: 'http://i.pravatar.cc/100' }} style={styles.avatar} /></Block>
      <Block flex style={styles.middle}>
          <Usuario />
        <Text muted size={theme.SIZES.FONT * 0.875}>React Native</Text>
      </Block>
    </Block>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 0.6875,
    paddingBottom: theme.SIZES.BASE * 1.6875,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 0.5,
    marginTop: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : null,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
});

const MenuIcon = ({ name, family, focused }) => (
  <Icon
    name={name}
    family={family}
    size={theme.SIZES.FONT}
    color={focused ? theme.COLORS.WHITE : '#5D5D5D'}
  />
);

MenuIcon.defaultProps = {
  name: null,
  family: null,
  focused: false,
};

MenuIcon.propTypes = {
  name: PropTypes.string,
  family: PropTypes.string,
  focused: PropTypes.bool,
};

const screens = {
  Citas: {
    screen: Citas,
    navigationOptions: {
      drawerLabel: 'Citas',
      drawerIcon: props => <MenuIcon name="calendar" family="font-awesome" focused={props.focused} />,
    },
  },
};

const options = {
  contentComponent: props => <GalioDrawer {...props} />,
  contentOptions: {
    labelStyle: {
      fontWeight: '500',
      color: theme.COLORS.GREY,
      fontSize: theme.SIZES.FONT * 0.875,
      marginLeft: theme.SIZES.BASE * 0.75,
    },
    activeLabelStyle: {
      color: theme.COLORS.WHITE,
    },
    activeBackgroundColor: theme.COLORS.THEME,
    itemsContainerStyle: {
      paddingVertical: 0,
    },
    iconContainerStyle: {
      marginHorizontal: 0,
      marginLeft: theme.SIZES.BASE * 1.65,
      // marginRight: theme.SIZES.BASE * 0.76,
    },
  },
};

const GalioApp = createDrawerNavigator(screens, options);

export default GalioApp;
