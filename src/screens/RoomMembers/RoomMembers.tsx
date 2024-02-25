import {useNavigation, useRoute} from '@react-navigation/native';
import {Modal} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {PermissionDot} from '~/components/common/PermissonDot';
import {SpinnerDataLoadingShowcase} from '~/components/common/SpinnerDataLoadingShowcase';
import {
  UpdateUserPermissionView,
  UserPermissionList,
} from '~/components/common/UserPermissons';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {API, API_PATH} from '~/constants/api';
import {ROOM_PERMISSIONS, RoomPermission} from '~/constants/permissions';
import {
  PrivateRouteParamList,
  PrivateScreenWithBottomBarProps,
} from '~/constants/routes';
import {useFetchRoomMembers} from '~/hooks/Room/useFetchRoomMembers';
import {useDisclosure} from '~/hooks/common';
import {RoomMemberWithPermissions} from '~/schema/api/house';

export const RoomMembers = () => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {params} = useRoute();
  const {roomId} = params as PrivateRouteParamList['RoomMembers'];

  const [selectedUser, setSelectedUser] = useState<RoomMemberWithPermissions>();
  const {isOpen, onClose, onOpen} = useDisclosure();
  const {members, isFirstLoading, mutate} = useFetchRoomMembers(
    roomId,
    !!roomId,
  );

  const onSaveUserRoomPermission = async (
    user: RoomMemberWithPermissions,
    permissions: RoomPermission[],
  ) => {
    API.FALL_SURVEILANCE.put(
      {
        update_room_permissions: permissions,
      },
      API_PATH.HOUSE_SERVICES.UPDATE_ROOM_PERMISSIONS({
        room_id: roomId as string,
        member_id: user.id,
      }),
    ).json<any>(r => r);
    await mutate();
    onClose();
  };

  const permissionDotRenderer = useCallback(
    (permission: RoomPermission) => (
      <PermissionDot key={permission} permission={permission} />
    ),
    [],
  );

  return (
    <ScreenLayout
      topBar={
        <TopBar
          title="Room members"
          onBack={() => navigate('RoomDetail', {roomId: roomId as string})}
        />
      }>
      <SpinnerDataLoadingShowcase
        isLoading={isFirstLoading}
        isShowData={!!members?.length}>
        {!!roomId && (
          <UserPermissionList<RoomPermission, RoomMemberWithPermissions>
            members={members ?? []}
            getUserPermissions={user => user.room_permissions}
            permissionsEnum={sortedPermissions}
            onUserItemClicked={user => {
              setSelectedUser(user);
              onOpen();
            }}
            permissionDotRenderer={permissionDotRenderer}
          />
        )}
      </SpinnerDataLoadingShowcase>

      {!!selectedUser && (
        <Modal
          visible={isOpen}
          onBackdropPress={() => {
            onClose();
            setSelectedUser(undefined);
          }}>
          <UpdateUserPermissionView<RoomPermission, RoomMemberWithPermissions>
            onSubmitChangeMemberPermission={onSaveUserRoomPermission}
            getUserPermissions={user => user.room_permissions}
            permissionsEnum={sortedPermissions}
            permissionsLabelMapper={roomPermissionsLabelMapper}
            permissionDotRenderer={permissionDotRenderer}
            user={selectedUser}
            label={selectedUser.nickname + "'s roles"}
          />
        </Modal>
      )}
    </ScreenLayout>
  );
};

const sortedPermissions: RoomPermission[] = [
  ROOM_PERMISSIONS.ACCESS,
  ROOM_PERMISSIONS.ASSIGN,
  ROOM_PERMISSIONS.ASSIGN_ROOM_PERMISSION,
  ROOM_PERMISSIONS.RECEIVE_NOTIFICATION,
  ROOM_PERMISSIONS.DELETE,
];

const roomPermissionsLabelMapper = {
  [ROOM_PERMISSIONS.ACCESS]: 'Access Room',
  [ROOM_PERMISSIONS.ASSIGN]: 'Assign Room',
  [ROOM_PERMISSIONS.ASSIGN_ROOM_PERMISSION]: 'Update Member Permission',
  [ROOM_PERMISSIONS.RECEIVE_NOTIFICATION]: 'Receive Notification',
  [ROOM_PERMISSIONS.DELETE]: 'Delete Room',
  [ROOM_PERMISSIONS.REMOVE_MEMBER]: 'Remove Room Member',
};
