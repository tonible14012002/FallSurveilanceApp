import {useNavigation} from '@react-navigation/native';
import {Icon, Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function HouseItem() {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('HouseDetail', {id: 10})}>
      <View style={styles.container}>
        <Text>House 1</Text>

        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'row',
            gap: 2,
          }}>
          <Text category="s2">2</Text>
          <Icon name="arrow-right" style={{width: 16, height: 16}} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.8,
  },
});
