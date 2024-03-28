import {StyleSheet, View} from 'react-native';

export default function NotSeenLabel({style = {}}: {style?: Object}) {
  return <View style={{...styles.notSeenLabel, ...style}} />;
}

const styles = StyleSheet.create({
  notSeenLabel: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 50,
  },
});
