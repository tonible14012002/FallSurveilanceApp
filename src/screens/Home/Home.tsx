import {Layout, List, Text} from '@ui-kitten/components';
import {Avatar} from '~/components/core/v2/Avatar';
import Icon from '~/components/core/Icon';
import {Dimensions, StyleSheet, View} from 'react-native';
import FloatButton from '~/components/core/FloatButton';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {ReactNode, useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useHouseDetailContext} from '~/components/HouseDetail';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {useDisclosure} from '~/hooks/common';
import {useFetchJoinedHouses} from '~/hooks/useFetchJoinedHouses';
import {GetJoinedHousesResponse} from '~/schema/api/house';
import {useAuthContext} from '~/context/auth';
import {Skeleton} from '~/components/core/Skeleton';
import {getUserFullName} from '~/utils/user';
import TabItem from '~/components/core/TabItem';

export default function Home() {
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useAuthContext();
  const {setHouseId} = useHouseDetailContext();
  const {houses, isFirstLoading} = useFetchJoinedHouses();
  console.log({houses, isFirstLoading});

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
            borderRadius: 28,
          }}
          size="large"
          leftIcon={<Icon name="home" />}
          isLeftIcon
          rightEle={
            <Layout
              level="1"
              style={{
                borderRadius: 990,
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

  const hasSomeHouse = Boolean(owned_houses?.length || joined_houses?.length);

  const renderScreenLayout = (child: ReactNode) => (
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
                  label={getUserFullName(
                    user ?? {
                      first_name: 'Unknown',
                      last_name: 'User',
                    },
                  )}
                  source={{
                    uri: user?.avatar,
                  }}
                />
              }
            />
          }
        />
      }
      floatEl={hasSomeHouse && <FloatButton pressHandler={onAddButtonPress} />}
      hasPadding
      isScrollable>
      {child}
    </ScreenLayout>
  );

  if (isFirstLoading) {
    return renderScreenLayout(
      <View style={{gap: 16}}>
        <Skeleton
          width={Dimensions.get('screen').width - 24}
          height={80}
          radius={1000}
        />
        <Skeleton
          width={Dimensions.get('screen').width - 24}
          height={80}
          radius={1000}
        />
        <Skeleton
          width={Dimensions.get('screen').width - 24}
          height={80}
          radius={1000}
        />
      </View>,
    );
  }

  return renderScreenLayout(
    <>
      {!hasSomeHouse && (
        <View style={{gap: 24}}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            Oops! You haven't joined any houses.
          </Text>
          <TabItem
            icon={<Icon name="home" />}
            containerStyle={{width: 140}}
            onPressHandler={onAddButtonPress}
            title="Setup A House"
          />
        </View>
      )}
      {(owned_houses?.length ?? 0) !== 0 && (
        <>
          <Text category="label">Owned Houses</Text>
          <List
            style={{backgroundColor: 'transparent', marginVertical: 18}}
            ItemSeparatorComponent={() => <View style={{height: 12}} />}
            scrollEnabled={false}
            data={owned_houses}
            ListHeaderComponentStyle={{backgroundColor: 'black'}}
            renderItem={renderHomeItem}
          />
        </>
      )}
      {(joined_houses?.length ?? 0) !== 0 && (
        <>
          <Text category="label">Joined Houses</Text>
          <List
            style={{backgroundColor: 'transparent', marginTop: 18}}
            ItemSeparatorComponent={() => <View style={{height: 12}} />}
            scrollEnabled={false}
            data={joined_houses}
            ListHeaderComponentStyle={{backgroundColor: 'black'}}
            renderItem={renderHomeItem}
          />
        </>
      )}
    </>,
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
