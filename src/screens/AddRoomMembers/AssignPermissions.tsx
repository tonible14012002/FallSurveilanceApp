import {Button, Modal} from '@ui-kitten/components';
import {useCallback} from 'react';
import {PermissionDot} from '~/components/common/PermissonDot';
import {
  UpdateUserPermissionView,
  UserPermissionList,
} from '~/components/common/UserPermissons';
import {ROOM_PERMISSIONS, RoomPermission} from '~/constants/permissions';
import {useDisclosure} from '~/hooks/common';
import {RoomMemberWithPermissions} from '~/schema/api/house';
import {roomPermissionsLabelMapper} from '../RoomMembers';

interface AssignPermissionsProps {
  isLoading: boolean;
  members: RoomMemberWithPermissions[];
  selectedUser?: RoomMemberWithPermissions;
  setSelectedUser: (user?: RoomMemberWithPermissions) => void;
  onDoneAddMembers: () => void;
  onSubmitChangeMemberPermission: (
    user: RoomMemberWithPermissions,
    permission: RoomPermission[],
  ) => void;
}

export const AssignPermissions = (props: AssignPermissionsProps) => {
  const {
    isLoading,
    members,
    selectedUser,
    setSelectedUser,
    onDoneAddMembers,
    onSubmitChangeMemberPermission,
  } = props;

  const {isOpen, onClose, onOpen} = useDisclosure();

  const permissionDotRenderer = useCallback(
    (permission: RoomPermission) => (
      <PermissionDot key={permission} permission={permission} />
    ),
    [],
  );

  return (
    <>
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

      {!!selectedUser && (
        <Modal
          visible={isOpen}
          onBackdropPress={() => {
            onClose();
            setSelectedUser(undefined);
          }}>
          <UpdateUserPermissionView<RoomPermission, RoomMemberWithPermissions>
            onSubmitChangeMemberPermission={onSubmitChangeMemberPermission}
            getUserPermissions={user => user.room_permissions}
            permissionsEnum={sortedPermissions}
            permissionsLabelMapper={roomPermissionsLabelMapper}
            permissionDotRenderer={permissionDotRenderer}
            user={selectedUser}
            label={selectedUser.nickname + "'s roles"}
          />
        </Modal>
      )}
      <Button
        disabled={isLoading}
        onPress={onDoneAddMembers}
        style={{margin: 15}}>
        Done
      </Button>
    </>
  );
};

const sortedPermissions = Object.keys(ROOM_PERMISSIONS) as RoomPermission[];
