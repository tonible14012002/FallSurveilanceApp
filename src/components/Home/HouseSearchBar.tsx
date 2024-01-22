import {Input, Layout} from '@ui-kitten/components';
import Icon from '../core/Icon';
import {StyleSheet} from 'react-native';

export default function HouseSearchBar() {
  return (
    <Layout level="1" style={styles.container}>
      <Icon name="search" size="medium" />
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
