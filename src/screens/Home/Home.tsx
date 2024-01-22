import {Avatar, Layout, List, Text} from '@ui-kitten/components';
import Icon from '~/components/core/Icon';
import {StyleSheet, View} from 'react-native';
import FloatButton from '~/components/core/FloatButton';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useHouseDetailContext} from '~/components/HouseDetail';

export default function Home() {
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const {setHouseId} = useHouseDetailContext();

  const onHomeItemPress = useCallback(
    (id: string) => {
      console.log(id);
      navigation.navigate('HouseDetail');
      setHouseId(id);
    },
    [navigation, setHouseId],
  );

  const renderHomeItem = useCallback(
    (i: any) => {
      return (
        <ListItem
          onPressHandler={() => onHomeItemPress(`${i.index + 1}`)}
          wrapperStyle={{
            borderRadius: 24,
          }}
          size="large"
          leftIcon={<Icon name="home" />}
          isLeftIcon
          rightEle={
            <Layout
              level="1"
              style={{
                borderRadius: 1000,
                padding: 10,
              }}>
              <Icon name="chevron-right-outline" />
            </Layout>
          }
          title={`House ${i.index + 1}`}
          subTitle={
            <View style={styles.houseSmallInfo}>
              <Text appearance="hint" category="c1">
                2 members
              </Text>
              <Text appearance="hint" category="c1">
                •
              </Text>
              <Text appearance="hint" category="c1">
                2 rooms
              </Text>
            </View>
          }
        />
      );
    },
    [onHomeItemPress],
  );

  return (
    <ScreenLayout
      topBar={
        <TopBar
          title="Houses"
          rightIcon={
            <Avatar
              source={{
                uri: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/369053435_3628631834068330_6252299390237773315_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=0A4cTRL139QAX8I1rlU&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCYocC0VA5dKjoQC9EyWOqFvdGVMjfK2-dvlAh7NJUG9Q&oe=65B22743',
              }}
            />
          }
        />
      }
      floatEl={<FloatButton pressHandler={() => {}} />}
      hasPadding
      hasBottomBar
      isScrollable>
      <Text category="label">Personal Houses</Text>
      <List
        style={{backgroundColor: 'transparent', marginVertical: 18}}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        scrollEnabled={false}
        data={[1, 2]}
        ListHeaderComponentStyle={{backgroundColor: 'black'}}
        renderItem={renderHomeItem}
      />
      <Text category="label">Joined Houses</Text>
      <List
        style={{backgroundColor: 'transparent', marginTop: 18}}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        scrollEnabled={false}
        data={[1, 2, 3]}
        ListHeaderComponentStyle={{backgroundColor: 'black'}}
        renderItem={renderHomeItem}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  houseSmallInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
