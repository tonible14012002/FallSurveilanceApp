import {Avatar, Layout, Popover, Text} from '@ui-kitten/components';
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
              size="small"
              source={{
                uri: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/369053435_3628631834068330_6252299390237773315_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=0A4cTRL139QAX8I1rlU&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCYocC0VA5dKjoQC9EyWOqFvdGVMjfK2-dvlAh7NJUG9Q&oe=65B22743',
              }}
            />
          }
          title={<Text category="s1">{user?.nickname}</Text>}
        />
        <ListItem
          onPressHandler={logout}
          size="large"
          level="1"
          title={
            <Text status="danger" category="s2">
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
