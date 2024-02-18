import {View} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {
  HOUSE_PERMISSIONS,
  HousePermission,
  ROOM_PERMISSIONS,
  type RoomPermission,
} from '~/constants/permissions';

const getRoomPermissionColorThemeString = {
  [ROOM_PERMISSIONS.ACCESS]: 'color-primary-default',
  [ROOM_PERMISSIONS.ASSIGN]: 'color-success-default',
  [ROOM_PERMISSIONS.ASSIGN_ROOM_PERMISSION]: 'color-info-default',
  [ROOM_PERMISSIONS.RECEIVE_NOTIFICATION]: 'color-warning-default',
  [ROOM_PERMISSIONS.REMOVE_MEMBER]: 'color-danger-default',
  [ROOM_PERMISSIONS.DELETE]: 'color-danger-default',
} as const;

const getHousePermissionColorThemeString = {
  [HOUSE_PERMISSIONS.INVITE_HOUSE_MEMBER]: 'color-primary-default',
  [HOUSE_PERMISSIONS.REMOVE_HOUSE]: 'color-danger-default',
  [HOUSE_PERMISSIONS.REMOVE_HOUSE_MEMBER]: 'color-warning-default',
} as const;

interface PermissionDotProps {
  permission?: RoomPermission | HousePermission;
}

const isRoomPermission = (value: string): value is RoomPermission => {
  return value in ROOM_PERMISSIONS;
};

export const PermissionDot = ({permission = 'ACCESS'}: PermissionDotProps) => {
  const theme = useTheme();
  const color = isRoomPermission(permission)
    ? getRoomPermissionColorThemeString[permission]
    : getHousePermissionColorThemeString[permission];

  return (
    <View
      style={[
        {width: 8, height: 8, borderRadius: 1000},
        {backgroundColor: theme[color]},
      ]}
    />
  );
};
