import {StyleSheet, View} from 'react-native';
import COLORS from '~/constants/colors';

export default function NotSeenLabel({style = {}}: {style?: Object}) {
  return <View style={{...styles.notSeenLabel, ...style}} />;
}

const styles = StyleSheet.create({
  notSeenLabel: {
    position: 'absolute',
    width: 8,
    height: 8,
    top: -4,
    right: -3,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: COLORS.yellow,
  },
});
