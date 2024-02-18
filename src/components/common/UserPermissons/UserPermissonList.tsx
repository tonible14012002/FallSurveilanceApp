import {Avatar, List} from '@ui-kitten/components';
import {View} from 'react-native';
import ListItem from '~/components/core/ListItem';
import {BasicUser} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';

interface UserPermissionListProps<
  P extends string,
  U extends BasicUser = BasicUser,
> {
  userCollections?: BaseResponse<BasicUser[]>[];
  enableScroll?: boolean;
  members: U[];
  roomId: string;
  permissionsEnum: P[];
  getUserPermissions: (user: U) => P[];
  permissionDotRenderer: (permission: P) => React.ReactNode;
  onUserItemClicked?: (user: U) => void;
}

export const UserPermissionList = <
  P extends string,
  U extends BasicUser = BasicUser,
>(
  props: UserPermissionListProps<P, U>,
) => {
  const {
    members,
    enableScroll,
    permissionsEnum,
    getUserPermissions,
    permissionDotRenderer,
    onUserItemClicked,
  } = props;

  const renderMember = ({item: user}: {item: U}) => {
    const userPermission = permissionsEnum.filter(p =>
      getUserPermissions(user).includes(p as P),
    );

    return (
      <ListItem
        key={user.id}
        onPressHandler={() => {
          onUserItemClicked?.(user);
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
              return permissionDotRenderer(permission);
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
    </View>
  );
};
