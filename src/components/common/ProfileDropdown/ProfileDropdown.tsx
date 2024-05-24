import {Layout, Popover, Text} from '@ui-kitten/components';
import {Avatar} from '~/components/core/v2/Avatar';
import {PopoverPlacement} from '@ui-kitten/components/ui/popover/type';
import {ReactNode} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import ListItem from '~/components/core/ListItem';
import {useAuthContext} from '~/context/auth';
import {getUserFullName} from '~/utils/user';

interface ProfileDropdownProps {
  trigger: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: PopoverPlacement;
}

export const ProfileDropdown = (props: ProfileDropdownProps) => {
  const {trigger, onOpen, isOpen, onClose, placement} = props;
  const {logout, user} = useAuthContext();

  const renderTrigger = () => <Pressable onPress={onOpen}>{trigger}</Pressable>;

  return (
    <Popover
      anchor={renderTrigger}
      visible={isOpen}
      onBackdropPress={onClose}
      placement={placement}
      style={styles.container}>
      <Layout>
        <ListItem
          size="small"
          leftIcon={
            <Avatar
              size="large"
              source={{
                uri: user?.avatar,
              }}
              label={getUserFullName(
                user ?? {first_name: 'Unknown', last_name: ''},
              )}
            />
          }
          title={<Text category="s1">{getUserFullName(user)}</Text>}
        />
        <ListItem
          onPressHandler={logout}
          level="1"
          title={
            <Text status="danger" category="s1">
              Logout
            </Text>
          }
        />
      </Layout>
    </Popover>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    elevation: 2,
    borderRadius: 24,
    overflow: 'hidden',
    transform: [{translateY: 12}],
  },
});
