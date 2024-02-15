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
import {GetJoinedHousesResponse} from '~/schema/api/house';
import {useAuthContext} from '~/context/auth';

export default function Home() {
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useAuthContext();
  const {setHouseId} = useHouseDetailContext();
  const {houses} = useFetchJoinedHouses();

  const owned_houses = useMemo(
    () => houses?.filter(house => house.is_owner),
    [houses],
  );

  const joined_houses = useMemo(
    () => houses?.filter(house => !house.is_owner),
    [houses],
  );

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
    ({item: detail}: {item: GetJoinedHousesResponse[number]}) => {
      return (
        <ListItem
          onPressHandler={() => onHomeItemPress(`${detail.id}`)}
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
          title={detail.name}
          subTitle={
            <View style={styles.houseSmallInfo}>
              <Text appearance="hint" category="c1">
                {detail.members.length} members
              </Text>
              <Text appearance="hint" category="c1">
                •
              </Text>
              <Text appearance="hint" category="c1">
                {detail.rooms.length} rooms
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
            <ProfileDropdown
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
              trigger={
                <Avatar
                  source={{
                    uri: user?.avatar,
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
      {owned_houses?.length !== 0 && (
        <>
          <Text category="label">Owned Houses</Text>
          <List
            style={{backgroundColor: 'transparent', marginVertical: 18}}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View style={{height: 12}} />}
            scrollEnabled={false}
            data={owned_houses}
            ListHeaderComponentStyle={{backgroundColor: 'black'}}
            renderItem={renderHomeItem}
          />
        </>
      )}
      {joined_houses?.length !== 0 && (
        <>
          <Text category="label">Joined Houses</Text>
          <List
            style={{backgroundColor: 'transparent', marginTop: 18}}
            // eslint-disable-next-line react/no-unstable-nested-components
            ItemSeparatorComponent={() => <View style={{height: 12}} />}
            scrollEnabled={false}
            data={joined_houses}
            ListHeaderComponentStyle={{backgroundColor: 'black'}}
            renderItem={renderHomeItem}
          />
        </>
      )}
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
