import React from 'react';
import {
  StyleSheet, ScrollView, Platform,Dimensions
} from 'react-native';

// galio components
import {
  Button, Block, Input, Text, NavBar,
} from 'galio-framework';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;


const { height, width } = Dimensions.get('window');
class Citas extends React.Component {
  state = {
    nombre: '',
    apellido: '',
    sexo: '',
    fecha_nacimiento: '',
    esta_civil: '',
    tipo_documento: '',
    documento: '',
    correo: '',
    telefono_domiciliar: '',
    telefono_celular: '',
    telefono_oficina: '',
    direccion: '',
  }

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
  

  render() {
    value = this.state
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
               <Text size={theme.SIZES.FONT * 0.75}  style={{ alignSelf: 'flex-start', lineHeight: theme.SIZES.FONT * 2, padding:0,margin:0, }} >
                    Tipo de Documento:
                </Text>
               {/* aqui debe ir tipo documento */}
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
              <Input
                rounded
                type="default"
                placeholder="direccion"
                value={value.direccion}
                autoCapitalize="none"
                placeholderTextColor={ theme.COLORS.MUTED }
                style={{ width: width*0.9}}
                onChangeText={text => this.handleChange('direccion', text)}
              />
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
    width: BASE_SIZE * 4,
    borderColor: 'transparent',
  },
});

export default Citas;
