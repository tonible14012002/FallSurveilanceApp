import {Layout, Popover, Text} from '@ui-kitten/components';
import {PopoverPlacement} from '@ui-kitten/components/ui/popover/type';
import {ReactNode} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import ListItem from '~/components/core/ListItem';
import {useAuthContext} from '~/context/auth';

interface ProfileDropdownProps {
  trigger: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: PopoverPlacement;
}

export const ProfileDropdown = (props: ProfileDropdownProps) => {
  const {trigger, onOpen, isOpen, onClose, placement} = props;
  const {logout} = useAuthContext();

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
          onPressHandler={logout}
          size="small"
          level="1"
          title={
            <Text status="danger" category="label">
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
    borderRadius: 8,
    overflow: 'hidden',
    transform: [{translateY: 12}],
  },
});
