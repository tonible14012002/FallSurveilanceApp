import {Button, Modal} from '@ui-kitten/components';
import {useCallback, useState} from 'react';
import {PermissionDot} from '~/components/common/PermissonDot';
import {
  UpdateUserPermissionView,
  UserPermissionList,
} from '~/components/common/UserPermissons';
import {HOUSE_PERMISSIONS, HousePermission} from '~/constants/permissions';
import {useDisclosure} from '~/hooks/common';
import {HouseMemberWithPermissions} from '~/schema/api/house';

interface AssignPermissionsProps {
  isLoading: boolean;
  members: HouseMemberWithPermissions[];
  selectedUser?: HouseMemberWithPermissions;
  setSelectedUser: (user?: HouseMemberWithPermissions) => void;
  onDoneAddMembers: () => void;
  onSubmitChangeMemberPermission: (
    user: HouseMemberWithPermissions,
    permission: HousePermission[],
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
    (permission: HousePermission) => (
      <PermissionDot key={permission} permission={permission} />
    ),
    [],
  );

  return (
    <>
      <UserPermissionList<HousePermission, HouseMemberWithPermissions>
        members={members ?? []}
        getUserPermissions={user => user.house_permissions}
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
          <UpdateUserPermissionView<HousePermission, HouseMemberWithPermissions>
            onSubmitChangeMemberPermission={onSubmitChangeMemberPermission}
            getUserPermissions={user => user.house_permissions}
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

const sortedPermissions = Object.keys(HOUSE_PERMISSIONS) as HousePermission[];

const roomPermissionsLabelMapper = {
  [HOUSE_PERMISSIONS.INVITE_HOUSE_MEMBER]: 'Invite House Member',
  [HOUSE_PERMISSIONS.REMOVE_HOUSE]: 'Remove House',
  [HOUSE_PERMISSIONS.REMOVE_HOUSE_MEMBER]: 'Remove House Member',
};
