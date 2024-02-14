import {Layout, List, Avatar, Text} from '@ui-kitten/components';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import {BasicUser, User} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';

export interface UserPickerProps {
  selectedUsers?: BasicUser[];
  onSelectedUsersChange?: (users: BasicUser[]) => void;
  userCollections: BaseResponse<User[]>[];
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  previewStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  enableScroll?: boolean;
}

const dump = (_: BasicUser[]) => {};

export const UserPicker = (props: UserPickerProps) => {
  const {
    selectedUsers = [],
    onSelectedUsersChange = dump,
    userCollections,
    style,
    previewStyle,
    wrapperStyle,
    enableScroll = true,
  } = props;

  const onUserItemPress = (user: BasicUser, included?: boolean) => {
    if (included || selectedUsers.some(u => u.id === user.id)) {
      const newUsers = selectedUsers.filter(u => u.id !== user.id);
      onSelectedUsersChange(newUsers);
    } else {
      const newIds = [...selectedUsers, user];
      onSelectedUsersChange(newIds);
    }
  };

  const renderUserCollection = ({item}: {item: BaseResponse<BasicUser[]>}) => {
    const {data} = item;
    return (
      <List
        key={item.pageable?.next_page}
        data={data}
        renderItem={({item: user}) => {
          const isSelected = selectedUsers.some(u => u.id === user.id);
          return (
            <ListItem
              size="medium"
              onPressHandler={() => {
                onUserItemPress(user, isSelected);
              }}
              wrapperStyle={{
                marginHorizontal: -16,
              }}
              level="1"
              rightEle={
                isSelected ? (
                  <Icon size="small" fill="blue" name="checkmark-outline" />
                ) : null
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
        }}
      />
    );
  };

  return (
    <Layout style={[{gap: 16, flex: 1}, wrapperStyle]} level="1">
      {Boolean(selectedUsers.length) && (
        <List
          style={[
            {
              backgroundColor: 'transparent',
              flexGrow: 0,
              paddingTop: 8,
              marginBottom: 16,
            },
            previewStyle,
          ]}
          horizontal
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          data={selectedUsers}
          renderItem={({item: user}) => (
            <Pressable
              onPress={() => onUserItemPress(user, true)}
              key={user.id}>
              <View style={{alignItems: 'center', paddingHorizontal: 8}}>
                <View style={{position: 'relative'}}>
                  <Avatar size="large" source={{uri: user.avatar}} />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      borderRadius: 1000,
                      transform: [{translateX: 10}],
                    }}>
                    <Icon name="close-circle-outline" />
                  </View>
                </View>
                <Text ellipsizeMode="tail" category="p2">
                  {user.nickname.length > 8
                    ? user.nickname.slice(0, 8)
                    : user.nickname}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
      <Text category="label" appearance="hint">
        Suggests
      </Text>
      <List
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: 'transparent'}, style]}
        scrollEnabled={enableScroll}
        data={userCollections ?? []}
        renderItem={renderUserCollection}
      />
    </Layout>
  );
};
