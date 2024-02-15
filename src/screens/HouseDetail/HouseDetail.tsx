import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {useEffect} from 'react';
import {Pressable} from 'react-native';
import {
  DevicesList,
  RoomsList,
  useHouseDetailContext,
} from '~/components/HouseDetail';
import Icon from '~/components/core/Icon';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {useFetchHouseDetail} from '~/hooks/useFetchHouseDetail';
import {useFetchJoinedHouses} from '~/hooks/useFetchJoinedHouses';
import {boringAvatar} from '~/libs/utils';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {ItemsSelectModal} from '~/components/core';
import ListItem from '~/components/core/ListItem';

export default function HouseDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {user} = useAuthContext();
  const {houseId, setHouseId} = useHouseDetailContext();
  const {
    isOpen: isOpenProfile,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
  } = useDisclosure();

  const {isOpen, onClose, onOpen} = useDisclosure();

  const {detail} = useFetchHouseDetail(houseId, Boolean(houseId));
  const {houses} = useFetchJoinedHouses(!houseId || isOpen);

  const rooms = detail?.rooms ?? [];
  const members = detail?.members ?? []; //members here

  useEffect(() => {
    if (houseId === undefined && houses?.[0]) {
      setHouseId(houses?.[0].id);
    }
  }, [houseId, houses, setHouseId]);

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
        hasBottomBar
        topBar={
          <TopBar
            onBack={() => navigate('Home')}
            rightIcon={
              <ProfileDropdown
                onClose={onCloseProfile}
                isOpen={isOpenProfile}
                onOpen={onOpenProfile}
                trigger={
                  <Avatar
                    source={{
                      uri: user?.avatar,
                    }}
                    loadingIndicatorSource={{
                      uri: boringAvatar(user?.nickname),
                    }}
                  />
                }
              />
            }
            title={
              <Pressable
                onPress={onOpen}
                style={({pressed}) => ({
                  opacity: pressed ? 0.7 : 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                })}>
                <Text category="h6">{detail?.name ?? ''}</Text>
                <Icon name="chevron-down-outline" />
              </Pressable>
            }
          />
        }>
        <UserList
          containerStyle={{marginBottom: 30}}
          listStyle={{gap: 10}}
          title={
            <Text category="s2" style={{opacity: 0.7}}>
              Members
            </Text>
          }
          detailNavigator={
            <Button
              style={{
                borderRadius: 1000,
                width: 35,
                height: 35,
              }}
              status="control">
              <Icon size="giant" name="chevron-right-outline" />
            </Button>
          }>
          {members.map(mem => (
            <Avatar
              key={mem.id}
              source={{
                uri: mem.avatar,
              }}
              style={{width: 50, height: 50}}
              loadingIndicatorSource={{
                uri: boringAvatar(mem.first_name),
              }}
            />
          ))}
          <Button
            style={{
              borderRadius: 1000,
              width: 50,
              height: 50,
            }}
            status="control">
            <Icon name="plus" />
          </Button>
        </UserList>

        <RoomsList rooms={rooms} />
        <DevicesList devices={rooms} />
      </ScreenLayout>

      <ItemsSelectModal
        isOpen={isOpen}
        onClose={onClose}
        items={houses || []}
        renderItem={({item}) => (
          <ListItem
            onPressHandler={() => {
              setHouseId(String(item.id));
              onClose();
            }}
            title={item.name}
            subTitle={`${item.members.length} members`}
            rightEle={
              houseId === String(item.id) ? (
                <Icon size="small" name="checkmark-outline" />
              ) : null
            }
            level="1"
          />
        )}
      />
    </>
  );
}
