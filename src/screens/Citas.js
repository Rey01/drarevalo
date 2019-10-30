import React from 'react';
import {
  StyleSheet, ScrollView, Platform,
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

// mock data
const cards = [
  {
    title: 'Tasks',
    subtitle: '15 completed tasks',
    icon: 'calendar',
    iconFamily: 'font-awesome',
  },

  {
    title: 'Aquisitions',
    subtitle: '15 completed tasks',
    icon: 'calendar',
    iconFamily: 'font-awesome',
  },
  {
    title: 'Cards',
    subtitle: '15 completed tasks',
    icon: 'calendar',
    iconFamily: 'font-awesome',
  },

  {
    title: 'Settings',
    subtitle: '15 completed tasks',
    icon: 'calendar',
    iconFamily: 'font-awesome',
  },
];

class Citas extends React.Component {
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
          onPress={() => this.props.navigation.navigate('New_cita')}
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
      <Block row center card shadow space="between" style={styles.card} key={props.title}>
        <Gradient
          start={[0.45, 0.45]}
          end={[0.90, 0.90]}
          colors={gradientColors}
          style={[styles.gradient, styles.left]}
        >
          <Icon
            size={BASE_SIZE}
            name={props.icon}
            color={COLOR_WHITE}
            family={props.iconFamily}
          />
        </Gradient>

        <Block flex>
          <Text size={BASE_SIZE * 1.125}>{props.title}</Text>
          <Text size={BASE_SIZE * 0.875} muted>{props.subtitle}</Text>
        </Block>
        <Button style={styles.right}>
          <Icon size={BASE_SIZE} name="arrow-right" family="font-awesome" color={COLOR_GREY} />
        </Button>
      </Block>
    );
  }

  renderCards = () => cards.map((card, index) => this.renderCard(card, index))

  render() {
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

const styles = StyleSheet.create({
  card: {
    borderColor: 'transparent',
    marginHorizontal: BASE_SIZE,
    marginVertical: BASE_SIZE / 2,
    padding: BASE_SIZE,
    backgroundColor: COLOR_WHITE,
    shadowOpacity: 0.40,
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
