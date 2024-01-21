import {Icon, Input, Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';

export default function HouseSearchBar() {
  return (
    <Layout level="1" style={styles.container}>
      <Icon name="search" fill="white" style={{width: 24, height: 24}} />
      <Input
        placeholder="Search"
        style={{
          flexGrow: 1,
        }}
      />
    </Layout>
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
