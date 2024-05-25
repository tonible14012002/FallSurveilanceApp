import {
  Avatar,
  Divider,
  Layout,
  Popover,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {PopoverPlacement} from '@ui-kitten/components/ui/popover/type';
import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import {useDisclosure} from '~/hooks/common';

interface NotificationActionProps {
  trigger: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: PopoverPlacement;
}

const NotificationAction = (props: NotificationActionProps) => {
  const {trigger, placement, isOpen, onOpen, onClose} = props;
  const renderTrigger = () => (
    <TouchableOpacity onPress={onOpen}>{trigger}</TouchableOpacity>
  );

  return (
    <Popover
      anchor={renderTrigger}
      visible={isOpen}
      onBackdropPress={onClose}
      placement={placement}
      style={styles.popoverContainer}>
      <Layout>
        <ListItem
          level="1"
          size="small"
          title={
            <Text status="primary" category="s2">
              Mark as read
            </Text>
          }
        />
        <Divider />
        <ListItem
          level="1"
          size="small"
          title={
            <Text status="danger" category="s2">
              Delete
            </Text>
          }
        />
      </Layout>
    </Popover>
  );
};

interface NotificationItemProps {
  avatarUrl?: string;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  isNotSeen?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  danger?: boolean;
}

export function NotificationItem(props: NotificationItemProps) {
  const {
    avatarUrl,
    title,
    subTitle,
    isNotSeen = false,
    style = {},
    onPress = () => {},
    danger,
  } = props;

  const {isOpen, onOpen, onClose} = useDisclosure();

  const theme = useTheme();
  return (
    <View style={[{marginVertical: 8, backgroundColor: 'transparent'}, style]}>
      <ListItem
        onPressHandler={onPress}
        title={title}
        subTitle={subTitle}
        style={{gap: 16}}
        textContentWrapperStyle={{gap: 4}}
        wrapperStyle={{
          backgroundColor: isNotSeen ? theme['color-basic-300'] : 'transparent',
          borderWidth: danger ? 1 : 0,
          borderColor: danger
            ? isNotSeen
              ? theme['color-danger-400']
              : theme['color-danger-300']
            : 'transparent',
          borderRadius: 32,
          padding: 16,
        }}
        leftIcon={
          avatarUrl && (
            <Avatar
              source={{
                uri: avatarUrl,
              }}
            />
          )
        }
        rightEle={
          <NotificationAction
            trigger={<Icon name="more-horizontal-outline" />}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  popoverContainer: {
    width: 120,
    elevation: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
