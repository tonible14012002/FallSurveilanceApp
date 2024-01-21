import {Icon, Layout, Text} from '@ui-kitten/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import HouseSearchBar from '~/components/Home/HouseSearchBar';
import MyHousesList from '~/components/Home/HousesList';
import HeaderRow from '~/components/core/HeaderRow';
import COLORS from '~/constants/colors';

export default function Account() {
  return (
    <Layout level="3" style={styles.container}>
      <HeaderRow title="Account" />
      <View style={styles.wrapper}>
        <View></View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    // backgroundColor: COLORS.primary,
    color: 'white',
  },
  wrapper: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
});
