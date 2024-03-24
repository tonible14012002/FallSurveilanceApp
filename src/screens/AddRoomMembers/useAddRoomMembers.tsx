import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';
import {mutate} from 'swr';
import {API, API_PATH} from '~/constants/api';
import {PAGINATION} from '~/constants/common';
import {ROOM_PERMISSIONS, RoomPermission} from '~/constants/permissions';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useDebouncedText} from '~/hooks/common/useDebouncedText';
import {useSearchRoomAssignableUsers} from '~/hooks/useSearchRoomAssignableMembers';
import {RoomMemberWithPermissions} from '~/schema/api/house';
import {BasicUser} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';
import {AddMemberStep} from './AddRoomMembers';
import {ROOM_DETAIL_KEY} from '~/hooks/useFetchRoomDetail';

interface Props {
  selectedUsers: BasicUser[];
  usersWithRoomPermissions: RoomMemberWithPermissions[];
  setUsersWithRoomPermissions: (users: RoomMemberWithPermissions[]) => void;
  setStep: (step: AddMemberStep) => void;
  setSelectedUser: (user?: RoomMemberWithPermissions) => void;
}

export const useAddRoomMembers = (props: Props) => {
  const {
    selectedUsers,
    setSelectedUser,
    setStep,
    setUsersWithRoomPermissions,
    usersWithRoomPermissions,
  } = props;

  const [isAddLoading, setIsAddLoading] = useState(false);

  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const {
    text: searchText,
    debouncedText: debouncedSearchText,
    changeText,
  } = useDebouncedText();
  const {
    userCollections,
    isLoading: isLoadingUsers,
    mutate: mutateAssignableUsers,
  } = useSearchRoomAssignableUsers({
    roomId: roomId!,
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: Boolean(roomId),
    search: debouncedSearchText,
  });
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();

  const handleNavigateAssignPermissionsStep = () => {
    const tempUsersWithRoomPermissions: RoomMemberWithPermissions[] = [];
    selectedUsers.forEach(user => {
      const existingUser = usersWithRoomPermissions.find(
        item => item.id === user.id,
      );
      if (!existingUser) {
        tempUsersWithRoomPermissions.push({
          ...user,
          room_permissions: Object.keys(ROOM_PERMISSIONS) as RoomPermission[],
        });
      } else {
        tempUsersWithRoomPermissions.push(existingUser);
      }
    });

    setUsersWithRoomPermissions(tempUsersWithRoomPermissions);

    setStep('ASSIGN_PERMISSIONS');
  };

  const handleSubmitChangeMemberPermission = (
    user: RoomMemberWithPermissions,
    permissions: RoomPermission[],
  ) => {
    setUsersWithRoomPermissions(
      usersWithRoomPermissions.map(item => {
        if (item.id === user.id) {
          return {...item, room_permissions: permissions};
        }
        return item;
      }),
    );
    setSelectedUser(undefined);
  };

  const handleDoneAddMembers = async () => {
    try {
      setIsAddLoading(true);

      const body = {
        add_members: usersWithRoomPermissions.map(({id, room_permissions}) => ({
          id,
          room_permissions,
        })),
      };
      console.log(body.add_members);

      await API.FALL_SURVEILANCE.post(
        body,
        API_PATH.HOUSE_SERVICES.ADD_ROOM_MEMBERS(roomId!),
      ).json<BaseResponse<any>>(r => r);

      Alert.alert('Members added!');

      await mutate([roomId, ROOM_DETAIL_KEY]);
      await mutateAssignableUsers();

      navigate('RoomDetail', {roomId});
    } catch (error) {
      console.log({error});
      Alert.alert('Fail to add member!', JSON.stringify(error));
    } finally {
      setIsAddLoading(false);
    }
  };

  return {
    searchText,
    changeText,
    isLoadingUsers,
    userCollections,
    isAddLoading,
    handleNavigateAssignPermissionsStep,
    handleSubmitChangeMemberPermission,
    handleDoneAddMembers,
  };
};
