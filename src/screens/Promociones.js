import React from 'react';
import {
  StyleSheet, ScrollView, Platform,Dimensions
} from 'react-native';

// galio components
import {
  Button, Block, Icon,  NavBar, Card,
} from 'galio-framework';
import theme from '../theme';

const BASE_SIZE = theme.SIZES.BASE;

const { width } = Dimensions.get('screen');
const cards = [
  {
    id: 1,
    image: 'https://medicina.uv.cl/images/banco_de_fotos/especialidades-medicas.jpg',
    title: 'Examenes de Ginecologia 1',
    caption: '31-10-2019',
  },
  {
    id: 2,
    image: 'https://www.ecestaticos.com/imagestatic/clipping/3c4/906/3c4906527aa1b34915ca5c55c30d52ee/los-sintomas-que-debes-tener-presentes-para-buscar-atencion-medica.jpg?mtime=1496310047',
    title: 'Examenes de Ginecologia 2',
    caption: '31-10-2019',
  },
  {
    id: 3,
    image: 'https://image.freepik.com/vector-gratis/cuidado-salud-antecedentes-medicos-formas-geometricas-hexagonales_1017-11948.jpg',
    title: 'Examenes de Ginecologia 3',
    caption: '31-10-2019',
  },
  {
    id: 4,
    image: 'https://image.posta.com.mx/sites/default/files/segurodegastosmedicos.jpg',
    title: 'Examenes de Ginecologia 4',
    caption: '31-10-2019',
  },
];

class Citas extends React.Component {
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

  

  render() {
    return (
      <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
        {/* header */}
        {this.renderHeader()}

        {/* cards */}
        <ScrollView contentContainerStyle={styles.cards}>
          <Block flex space="between">
            {cards && cards.map((card, id) => (
              <Card
                key={`card-${card.image}`}
                flex
                borderless
                shadowColor={theme.COLORS.BLACK}
                titleColor={card.full ? theme.COLORS.WHITE : null}
                style={styles.card}
                title={card.title}
                caption={card.caption}
                image={card.image}
                imageStyle={[card.padded ? styles.rounded : null]}
                imageBlockStyle={[
                  card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
                  card.full ? null : styles.noRadius,
                ]}
                footerStyle={card.full ? styles.full : null}
              >
                {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
              </Card>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  menu: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
  settings: {
    width: BASE_SIZE * 2,
    borderColor: 'transparent',
  },
});

export default Citas;
