import React from 'react';
import {
  StyleSheet, ScrollView, Platform,Dimensions
} from 'react-native';
import Textarea from 'react-native-textarea';

// galio components
import {
  Button, Block, Icon, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;

const { height, width } = Dimensions.get('window');
class Citas extends React.Component {

  state ={
    text:""
  }
  renderHeader = () => (
    <NavBar
      title="Citas"
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
  
  actualizar_datos = async () => {
    Alert.alert('Datos guardados correctamente');
    return false;
    var idExpediente=this.state.usuario.idExpediente;
    var dataSend = new FormData();
    dataSend.append('idAsignacionMembresia', idAsignacionMembresia);
    dataSend.append('idExpediente', idExpediente);
    
    return fetch(theme.COMPONENTS.URL_API+"GetConsultas?idAsignacionMembresia="+idAsignacionMembresia+"&idExpediente="+idExpediente, {
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
  

  render() {
    return (
      <Block flex={2} center space="evenly">
        {/* header */}
        {this.renderHeader()}

        {/* cards */}
        <ScrollView style={{ flex: 1 }}>
          <Block flex={2}>
               <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.onChange}
                defaultValue={this.state.text}
                maxLength={120}
                placeholder={'Antecedente'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
              <Button
                  round
                  color="error"
                  onPress={() => this.actualizar_datos()}
                  style={{ marginBottom: 300,width:width*0.9 }}
                >
                Actualizar
              </Button>
            </Block>
        </ScrollView>
      </Block>
    );
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
    color: '#333',
  },
});

export default Citas;
