import {View} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {ROOM_PERMISSIONS, type RoomPermission} from '~/constants/permissions';

const getPermissionColorThemeString = {
  [ROOM_PERMISSIONS.ACCESS]: 'color-primary-default',
  [ROOM_PERMISSIONS.ASSIGN]: 'color-success-default',
  [ROOM_PERMISSIONS.ASSIGN_ROOM_PERMISSION]: 'color-info-default',
  [ROOM_PERMISSIONS.RECEIVE_NOTIFICATION]: 'color-warning-default',
  [ROOM_PERMISSIONS.REMOVE_MEMBER]: 'color-danger-default',
  [ROOM_PERMISSIONS.DELETE]: 'color-danger-default',
} as const;

interface PermissionDotProps {
  permission?: RoomPermission;
}

export const RoomPermissionDot = ({
  permission = 'ACCESS',
}: PermissionDotProps) => {
  const theme = useTheme();
  const color = getPermissionColorThemeString[permission];
  return (
    <View
      style={[
        {width: 8, height: 8, borderRadius: 1000},
        {backgroundColor: theme[color]},
      ]}
    />
  );
};
