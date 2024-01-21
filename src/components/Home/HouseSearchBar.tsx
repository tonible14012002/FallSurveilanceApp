import {Icon, Input} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

export default function HouseSearchBar() {
  return (
    <View style={styles.container}>
      <Icon name="search" fill="white" style={{width: 24, height: 24}} />
      <Input
        placeholder="Search"
        style={{
          flexGrow: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    marginTop: 30,
  },
});
