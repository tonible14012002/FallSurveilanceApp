import {Avatar, Layout, List, Text} from '@ui-kitten/components';
import Icon from '~/components/core/Icon';
import {StyleSheet, View} from 'react-native';
import FloatButton from '~/components/core/FloatButton';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useHouseDetailContext} from '~/components/HouseDetail';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {useDisclosure} from '~/hooks/common';
import {useFetchJoinedHouses} from '~/hooks/useFetchJoinedHouses';
import {HouseInfo} from '~/schema/api/house';

export default function Home() {
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {setHouseId} = useHouseDetailContext();
  const {houses} = useFetchJoinedHouses();

  const formatedHouses = useMemo(() => {
    let personalHouses: HouseInfo[] = [];
    let joinedHouses: HouseInfo[] = [];

    if (houses && houses.length > 0) {
      houses.forEach(house => {
        if (house.is_owner) personalHouses.push(house);
        else joinedHouses.push(house);
      });
    }

    return {
      personalHouses,
      joinedHouses,
    };
  }, [houses]);

  const onHomeItemPress = useCallback(
    (id: string) => {
      setHouseId(id);
      navigation.navigate('HouseDetail');
    },
    [navigation, setHouseId],
  );

  const onAddButtonPress = useCallback(() => {
    navigation.navigate('AddHouse');
  }, [navigation]);

  const renderHomeItem = useCallback(
    ({item: house}: {item: HouseInfo}) => {
      return (
        <ListItem
          onPressHandler={() => onHomeItemPress(house.id)}
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
          title={house.name}
          subTitle={
            <View style={styles.houseSmallInfo}>
              <Text appearance="hint" category="c1">
                {house.members.length} members
              </Text>
              <Text appearance="hint" category="c1">
                •
              </Text>
              <Text appearance="hint" category="c1">
                {house.rooms.length} rooms
              </Text>
            </View>
          }
        />
      );
    },
    [onHomeItemPress, formatedHouses],
  );

  return (
    <ScreenLayout
      topBar={
        <TopBar
          title="Houses"
          rightIcon={
            <ProfileDropdown
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
              trigger={
                <Avatar
                  source={{
                    uri: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/369053435_3628631834068330_6252299390237773315_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=0A4cTRL139QAX8I1rlU&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCYocC0VA5dKjoQC9EyWOqFvdGVMjfK2-dvlAh7NJUG9Q&oe=65B22743',
                  }}
                />
              }
            />
          }
        />
      }
      floatEl={<FloatButton pressHandler={onAddButtonPress} />}
      hasPadding
      hasBottomBar
      isScrollable>
      <Text category="label">Personal Houses</Text>
      <List
        style={{backgroundColor: 'transparent', marginVertical: 18}}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        scrollEnabled={false}
        data={formatedHouses['personalHouses']}
        ListHeaderComponentStyle={{backgroundColor: 'black'}}
        renderItem={renderHomeItem}
      />
      <Text category="label">Joined Houses</Text>
      <List
        style={{backgroundColor: 'transparent', marginTop: 18}}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        scrollEnabled={false}
        data={formatedHouses['joinedHouses']}
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
