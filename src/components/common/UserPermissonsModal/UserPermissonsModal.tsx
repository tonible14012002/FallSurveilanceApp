import {
  Avatar,
  Layout,
  List,
  Modal,
  Text,
  Button,
  Divider,
  useTheme,
} from '@ui-kitten/components';
import {useState} from 'react';
import {View} from 'react-native';
import ListItem from '~/components/core/ListItem';
import {RoomMemberWithPermissions} from '~/schema/api/house';
import {BasicUser} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';
import {RoomPermissionDot} from '../RoomPermissonDot';
import {ROOM_PERMISSIONS, RoomPermission} from '~/constants/permissions';
import {useDisclosure} from '~/hooks/common';
import {Controller, useForm} from 'react-hook-form';
import Icon from '~/components/core/Icon';
import {API, API_PATH} from '~/constants/api';

const sortedPermissions: RoomPermission[] = [
  ROOM_PERMISSIONS.ACCESS,
  ROOM_PERMISSIONS.ASSIGN,
  ROOM_PERMISSIONS.ASSIGN_ROOM_PERMISSION,
  ROOM_PERMISSIONS.RECEIVE_NOTIFICATION,
  ROOM_PERMISSIONS.DELETE,
];

interface UserPermissionsModalProps {
  userCollections?: BaseResponse<BasicUser[]>[];
  enableScroll?: boolean;
  members: RoomMemberWithPermissions[];
  roomId: string;
  onUpdatedPermissions?: () => void;
}

export const UserPermissionsModal = (props: UserPermissionsModalProps) => {
  const {members, enableScroll, roomId, onUpdatedPermissions} = props;

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<RoomMemberWithPermissions>();

  const renderMember = ({item: user}: {item: RoomMemberWithPermissions}) => {
    const userPermission = sortedPermissions.filter(p =>
      user.room_permissions.includes(p),
    );

    return (
      <ListItem
        key={user.id}
        onPressHandler={() => {
          setSelectedUser(user);
          onOpen();
        }}
        size="small"
        rightEle={
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              paddingRight: 2,
            }}>
            {userPermission.map(permission => {
              return <RoomPermissionDot permission={permission} />;
            })}
          </View>
        }
        isRightIcon
        leftIcon={
          <Avatar
            source={{
              uri: user.avatar,
            }}
          />
        }
        title={user.nickname}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <List
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: 'transparent'}]}
        scrollEnabled={enableScroll}
        data={members ?? []}
        renderItem={renderMember}
      />
      {!!selectedUser && (
        <Modal visible={isOpen} onBackdropPress={onClose}>
          <UpdateUserPermissionModal
            user={selectedUser}
            roomId={roomId}
            onFinished={() => {
              onUpdatedPermissions?.();
              onClose();
            }}
          />
        </Modal>
      )}
    </View>
  );
};

interface UpdateUserPermissionModalProps {
  user: RoomMemberWithPermissions;
  roomId: string;
  onFinished?: () => void;
}

interface UpdateUserPermissionFormValue {
  permissions: RoomPermission[];
}

const UpdateUserPermissionModal = (props: UpdateUserPermissionModalProps) => {
  const {user, roomId, onFinished} = props;
  const theme = useTheme();
  const userPermissions = sortedPermissions.filter(p =>
    user.room_permissions.includes(p),
  );

  const {control, handleSubmit} = useForm<UpdateUserPermissionFormValue>({
    defaultValues: {
      permissions: userPermissions,
    },
  });

  const onSubmit = handleSubmit(async value => {
    const submitPermissions = value.permissions;
    API.FALL_SURVEILANCE.put(
      {
        update_room_permissions: submitPermissions,
      },
      API_PATH.HOUSE_SERVICES.UPDATE_ROOM_PERMISSIONS({
        room_id: roomId,
        member_id: user.id,
      }),
    ).json<any>(r => r);
    await onFinished?.();
  });

  return (
    <Layout
      style={{
        width: 360,
        height: 400,
        elevation: 2,
        padding: 16,
        borderRadius: 8,
      }}>
      <Text
        style={{
          paddingBottom: 16,
          fontSize: 16,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        {user.nickname} 's room permissions
      </Text>
      <Divider style={{marginHorizontal: -16}} />
      <List
        style={{backgroundColor: '#fff', flex: 1}}
        data={sortedPermissions}
        ItemSeparatorComponent={Divider}
        scrollEnabled
        renderItem={({item: permission}) => {
          return (
            <Controller
              name="permissions"
              control={control}
              render={({field: {onChange, value}}) => {
                const isSelected = value.includes(permission);
                return (
                  <ListItem
                    key={permission}
                    size="medium"
                    onPressHandler={() => {
                      if (isSelected) {
                        onChange(value.filter(p => p !== permission));
                      } else {
                        onChange([...value, permission]);
                      }
                    }}
                    wrapperStyle={{
                      marginHorizontal: -16,
                    }}
                    level="1"
                    leftIcon={<RoomPermissionDot permission={permission} />}
                    isRightIcon
                    rightEle={
                      isSelected ? (
                        <Icon
                          size="small"
                          fill={theme['color-primary-default']}
                          name="checkmark-outline"
                        />
                      ) : null
                    }
                    title={permission}
                  />
                );
              }}
            />
          );
        }}
      />
      <Divider />
      <View
        style={{
          display: 'flex',
          padding: 16,
          marginHorizontal: -16,
        }}>
        <Button style={{flex: 1}} onPress={onSubmit}>
          Save
        </Button>
      </View>
    </Layout>
  );
};
