import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {Button, Text} from '@ui-kitten/components';
import {Avatar} from '~/components/core/v2/Avatar';
import {useCallback, useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {RoomsList, useHouseDetailContext} from '~/components/HouseDetail';
import {EditHouseModal} from '~/components/HouseDetail/EditHouseModal';
import {AddMemberModal} from '~/components/common/AddMemberModal';
import {ConfirmationModal} from '~/components/common/ConfimationModal';
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
import {
  useFetchHouseDetail,
  useMutateHouseDetail,
} from '~/hooks/useFetchHouseDetail';
import {useFetchJoinedHouses} from '~/hooks/useFetchJoinedHouses';
import {useSearchUsers} from '~/hooks/useSearchUsers';
import {useDebounce} from '~/libs/hooks/useDebounce';
import {boringAvatar} from '~/libs/utils';
import {mutate} from 'swr';
import {API, API_PATH} from '~/constants/api';
import {err} from 'react-native-svg';
import {BaseResponse} from '~/schema/common';
import {getUserFullName} from '~/utils/user';
import {EditableText} from '~/components/core/EditableText';
import {IconButton} from '~/components/core/IconButton';

export default function HouseDetailScreen() {
  const theme = useTheme();
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
  const {
    isOpen: isOpenConfirmationModal,
    onOpen: onOpenConfirmationModal,
    onClose: onCloseConfirmationModal,
  } = useDisclosure();
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

  const mutateHouseDetail = useMutateHouseDetail(houseId ?? '');
  const {houses} = useFetchJoinedHouses(!houseId || isOpenHousesSelect);

  const rooms = detail?.rooms ?? [];
  const members = detail?.members ?? [];

  const isAllowEdit = Boolean(detail?.is_owner);
  const isAllowAddMembers = Boolean(
    detail?.house_permissions.includes(HOUSE_PERMISSIONS.INVITE_HOUSE_MEMBER),
  );
  const isAllowAddRoom = isAllowEdit;

  const handleUpdateHouseName = useCallback(
    async (value: string) => {
      if (!detail || value.length < 3) {
        return;
      }
      const newHouseValue = {...detail, name: value};
      mutateHouseDetail(newHouseValue, false); // update cache only
      console.log('newHouseValue', value);
      try {
        await API.FALL_SURVEILANCE.patch(
          {
            name: value,
          },
          API_PATH.HOUSE_SERVICES.HOUSE_DETAIL(detail?.id as string),
        ).json<BaseResponse<any>>(r => r);
      } catch (e) {}
      mutateHouseDetail(newHouseValue);
    },
    [detail, mutateHouseDetail],
  );

  const onDelete = async () => {
    try {
      await API.FALL_SURVEILANCE.delete(
        API_PATH.HOUSE_SERVICES.DELETE(houseId!),
      ).json<BaseResponse<any>>(r => r);
      navigate('Main');
      navigate('Home');
      mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);
    } catch (error) {
      console.log(err);
    }
    onCloseConfirmationModal();
  };

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
        gap: 16,
      }}>
      <IconButton
        icon={<Icon size="medium" name="trash-outline" />}
        onPress={onOpenConfirmationModal}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />
      <IconButton
        icon={<Icon size="medium" name="edit-outline" />}
        onPress={isAllowEdit ? onOpenHouseEdit : undefined}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />
      <View style={{position: 'relative'}}>
        <IconButton
          icon={<Icon size="medium" name="bell-outline" />}
          onPress={handleNotificationInboxPressed}
          width={42}
          height={42}
          style={{
            backgroundColor: theme['color-basic-200'],
          }}
        />
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
                    label={getUserFullName(user)}
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
                {houseId === undefined ? null : (
                  <Icon name="chevron-down-outline" />
                )}
              </Pressable>
            }
          />
        }>
        {houseId === undefined ? (
          <View />
        ) : (
          <>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <View style={{gap: 8}}>
                <Text category="s1" style={{opacity: 0.7}}>
                  Welcome Back!
                </Text>
                <View style={{position: 'relative'}}>
                  {isAllowEdit && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -4,
                        right: -8,
                      }}>
                      <Icon size="tiny" name="edit-outline" />
                    </View>
                  )}
                  <EditableText
                    disabled={!isAllowEdit}
                    numberOfLines={2}
                    style={{
                      fontWeight: 'bold',
                      color: 'black',
                      fontSize: 28,
                      flexWrap: 'wrap',
                    }}
                    value={detail?.name}
                    onUpdate={value => {
                      handleUpdateHouseName(value);
                    }}
                  />
                </View>
              </View>
              <View style={{flexShrink: 0}}>{__renderHouseActionsBar()}</View>
            </View>
            <UserList
              containerStyle={{marginBottom: 30}}
              listStyle={{gap: 10}}
              title={<Text category="label">Members</Text>}
              detailNavigator={
                <Button
                  onPress={
                    isAllowAddMembers ? handleNavigateAddMembers : undefined
                  }
                  style={{
                    borderRadius: 1000,
                    width: 35,
                    height: 35,
                  }}
                  appearance="ghost"
                  status="basic">
                  <Icon name="plus" />
                </Button>
              }>
              {members.map(mem => (
                <Avatar
                  key={mem.id}
                  label={getUserFullName(user)}
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
          </>
        )}
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
            title={<Text style={{fontWeight: '700'}}>{item.name}</Text>}
            subTitle={`${item.members.length} members`}
            rightEle={
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                {item.is_owner && (
                  <View
                    style={{
                      backgroundColor: theme['color-primary-400'],
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 32,
                    }}>
                    <Text category="label" style={{color: 'white'}}>
                      Owner
                    </Text>
                  </View>
                )}
                {houseId === String(item.id) ? (
                  <Icon size="small" name="checkmark-outline" />
                ) : null}
              </View>
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

      <ConfirmationModal
        title="Do you want to delete this house?"
        isLoading={false}
        isOpen={isOpenConfirmationModal}
        onAccept={onDelete}
        onCancel={onCloseConfirmationModal}
      />
    </>
  );
}
