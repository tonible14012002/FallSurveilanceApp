import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {RoomsList, useHouseDetailContext} from '~/components/HouseDetail';
import {EditHouseModal} from '~/components/HouseDetail/EditHouseModal';
import {AddMemberModal} from '~/components/common/AddMemberModal';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {ItemsSelectModal} from '~/components/core';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PAGINATION} from '~/constants/common';
import {HOUSE_PERMISSIONS} from '~/constants/permissions';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {useFetchHouseDetail} from '~/hooks/useFetchHouseDetail';
import {useFetchJoinedHouses} from '~/hooks/useFetchJoinedHouses';
import {useSearchUsers} from '~/hooks/useSearchUsers';
import {useDebounce} from '~/libs/hooks/useDebounce';
import {boringAvatar} from '~/libs/utils';

export default function HouseDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {user} = useAuthContext();
  const {houseId, setHouseId} = useHouseDetailContext();
  const {
    isOpen: isOpenProfile,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
  } = useDisclosure();
  const {isOpen: isOpenAddMember, onClose: onCloseAddMember} = useDisclosure();
  const {
    isOpen: isOpenHouseEdit,
    onClose: onCloseHouseEdit,
    onOpen: onOpenHouseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenHousesSelect,
    onClose: onCloseHousesSelect,
    onOpen: onOpenHousesSelect,
  } = useDisclosure();

  const handleNotificationInboxPressed = () => {
    if (!houseId) {
      return;
    }
    navigate('HouseNotification', {houseId: houseId});
  };

  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 400);

  const {userCollections, isLoading: isLoadingUserCollections} = useSearchUsers(
    {
      page: 1,
      pageSize: PAGINATION.SMALL,
      allowFetch: isOpenAddMember,
      search: debouncedSearch,
    },
  );
  const {detail} = useFetchHouseDetail(houseId, Boolean(houseId));
  const {houses} = useFetchJoinedHouses(!houseId || isOpenHousesSelect);

  const rooms = detail?.rooms ?? [];
  const members = detail?.members ?? [];

  const isAllowEdit = Boolean(detail?.is_owner);
  const isAllowAddMembers = Boolean(
    detail?.house_permissions.includes(HOUSE_PERMISSIONS.INVITE_HOUSE_MEMBER),
  );
  const isAllowAddRoom = isAllowEdit;

  const handleNavigateAddMembers = () => navigate('AddHouseMembers');

  useEffect(() => {
    if (houseId === undefined && houses?.[0]) {
      setHouseId(houses?.[0].id);
    }
  }, [houseId, houses, setHouseId]);

  const __renderHouseActionsBar = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
        marginBottom: 15,
      }}>
      <Button
        onPress={isAllowEdit ? onOpenHouseEdit : undefined}
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
          opacity: isAllowEdit ? 1 : 0.3,
        }}
        status="warning"
        appearance="ghost">
        <Icon name="edit-outline" />
      </Button>

      <Button
        onPress={isAllowAddMembers ? handleNavigateAddMembers : undefined}
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
          opacity: isAllowAddMembers ? 1 : 0.3,
        }}
        appearance="ghost">
        <Icon name="person-add-outline" />
      </Button>
      <View style={{position: 'relative'}}>
        <Button
          onPress={handleNotificationInboxPressed}
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
          }}
          status="warning"
          appearance="ghost">
          <Icon name="bell-outline" />
        </Button>
        {/* DOT Indicator */}
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 10,
            height: 10,
            backgroundColor: 'red',
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
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
                onPress={onOpenHousesSelect}
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
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text category="s1">Welcome Back!</Text>
            <Text category="h4">{user?.nickname}</Text>
          </View>
          <View>{__renderHouseActionsBar()}</View>
        </View>
        <UserList
          containerStyle={{marginBottom: 30}}
          listStyle={{gap: 10}}
          title={<Text category="label">Members</Text>}
          detailNavigator={
            <Button
              style={{
                borderRadius: 1000,
                width: 35,
                height: 35,
              }}
              appearance="ghost"
              status="basic">
              <Icon name="chevron-right-outline" />
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
            status="basic"
            onPress={handleNavigateAddMembers}>
            <Icon name="plus" />
          </Button>
        </UserList>

        <RoomsList rooms={rooms} allowAddRoom={isAllowAddRoom} />
      </ScreenLayout>

      <ItemsSelectModal
        isOpen={isOpenHousesSelect}
        onClose={onCloseHousesSelect}
        items={houses || []}
        renderItem={({item}) => (
          <ListItem
            onPressHandler={() => {
              setHouseId(String(item.id));
              onCloseHousesSelect();
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
      <AddMemberModal
        isOpen={isOpenAddMember}
        isLoading={isLoadingUserCollections}
        searchText={searchText}
        setSearchText={setSearchText}
        userCollections={userCollections ?? []}
        onClose={onCloseAddMember}
        onSave={() => {}}
      />
      <EditHouseModal
        isOpen={isOpenHouseEdit}
        data={detail}
        onClose={onCloseHouseEdit}
      />
    </>
  );
}
