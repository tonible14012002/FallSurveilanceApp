import {Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import HeaderRow from '~/components/core/HeaderRow';

export default function Account() {
  return (
    <Layout level="3" style={styles.container}>
      <HeaderRow title="Account" />
      <View style={styles.wrapper}>
        <View />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
  wrapper: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
});
