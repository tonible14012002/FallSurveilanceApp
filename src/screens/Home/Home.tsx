import {Layout, Text} from '@ui-kitten/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import HouseSearchBar from '~/components/Home/HouseSearchBar';
import MyHousesList from '~/components/Home/HousesList';
import FloatButton from '~/components/core/FloatButton';

export default function Home() {
  return (
    <Layout level="3" style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <Text category="h2" style={{textAlign: 'center'}}>
          Home
        </Text>
        <HouseSearchBar />
        {/* <UserList
          containerStyle={{marginTop: 20}}
          detailNavigator={<Text>dfh</Text>}>
          {[0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
            <Avatar source={LogoImg} />
          ))}
        </UserList> */}
        <MyHousesList title="My Houses" />
        <MyHousesList title="Other Houses" />
        <View style={{height: 20}} />
      </ScrollView>
      <FloatButton pressHandler={() => {}} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
  wrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
