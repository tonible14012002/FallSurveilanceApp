import {Icon, Layout, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import HouseSearchBar from '~/components/Home/HouseSearchBar';
import MyHousesList from '~/components/Home/HousesList';
import BottomTabBar from '~/components/core/BottomTabBar';
import COLORS from '~/constants/colors';

export default function Home() {
  return (
    <Layout level="3" style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{display: 'flex', alignItems: 'flex-end'}}>
          <Icon
            name="plus-circle-outline"
            fill="white"
            style={{width: 32, height: 32}}
          />
        </View>
        <Text category="h2" style={{textAlign: 'center'}}>
          Home
        </Text>
        <HouseSearchBar />
        <MyHousesList title="My Houses" />
        <MyHousesList title="Member Houses" />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: COLORS.primary,
    color: 'white',
  },
  wrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
