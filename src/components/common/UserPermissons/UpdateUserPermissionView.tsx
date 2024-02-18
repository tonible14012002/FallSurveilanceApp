import {
  useTheme,
  Layout,
  Divider,
  List,
  Text,
  Button,
} from '@ui-kitten/components';
import ListItem from '~/components/core/ListItem';
import Icon from '~/components/core/Icon';
import {useState} from 'react';
import {StyleProp, ViewStyle, View} from 'react-native';
import {BasicUser} from '~/schema/api/identity';

interface UpdateUserPermissionViewProps<
  P extends string,
  U extends BasicUser = BasicUser,
> {
  user: U;
  getUserPermissions: (user: U) => P[];
  permissionsEnum: P[];
  onSubmitChangeMemberPermission: (user: U, permission: P[]) => void;
  permissionDotRenderer: (permission: P) => React.ReactNode;
  permissionsLabelMapper?: Record<P, string>;
  wrapperStyle?: StyleProp<ViewStyle>;
  label?: string;
}

export const UpdateUserPermissionView = <
  P extends string,
  U extends BasicUser = BasicUser,
>(
  props: UpdateUserPermissionViewProps<P, U>,
) => {
  const {
    user,
    getUserPermissions,
    permissionsEnum,
    onSubmitChangeMemberPermission,
    permissionDotRenderer,
    wrapperStyle,
    permissionsLabelMapper,
    label,
  } = props;
  const theme = useTheme();
  const userPermissions = permissionsEnum.filter(p =>
    getUserPermissions(user).includes(p as P),
  );
  const [pickedPermissions, setPickedPermissions] = useState(userPermissions);

  return (
    <Layout
      style={[
        {
          width: 360,
          height: 400,
          elevation: 2,
          padding: 16,
          borderRadius: 8,
        },
        wrapperStyle,
      ]}>
      {!!label && (
        <>
          <Text
            style={{
              paddingBottom: 16,
              fontSize: 16,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {label}
          </Text>
          <Divider style={{marginHorizontal: -16}} />
        </>
      )}
      <List
        style={{backgroundColor: '#fff', flex: 1}}
        data={permissionsEnum}
        ItemSeparatorComponent={Divider}
        scrollEnabled
        renderItem={({item: permission}) => {
          const isSelected = pickedPermissions.includes(permission as P);
          return (
            <ListItem
              key={permission}
              size="medium"
              onPressHandler={() => {
                if (isSelected) {
                  setPickedPermissions(
                    pickedPermissions.filter(p => p !== permission),
                  );
                } else {
                  setPickedPermissions([...pickedPermissions, permission as P]);
                }
              }}
              wrapperStyle={{
                marginHorizontal: -16,
              }}
              level="1"
              leftIcon={permissionDotRenderer(permission)}
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
              title={permissionsLabelMapper?.[permission] ?? permission}
            />
          );
        }}
      />
      <Divider />
      <View
        style={{
          display: 'flex',
          padding: 16,
          paddingBottom: 0,
          marginHorizontal: -16,
        }}>
        <Button
          onPress={() => {
            onSubmitChangeMemberPermission(user, pickedPermissions);
          }}>
          Save
        </Button>
      </View>
    </Layout>
  );
};
