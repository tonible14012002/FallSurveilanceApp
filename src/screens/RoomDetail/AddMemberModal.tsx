import {Button, Input, Modal, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserPicker} from '~/components/UserPicker';
import Icon from '~/components/core/Icon';
import {PAGINATION} from '~/constants/common';
import {useSearchAssignableUsers} from '~/hooks/useSearchAssignableUsers';
import {useDebounce} from '~/libs/hooks/useDebounce';
import {BasicUser} from '~/schema/api/identity';

interface AddMemberModalProps {
  isOpen: boolean;
  roomId: string;
  onClose: () => void;
}

export default function AddMemberModal({
  isOpen,
  roomId,
  onClose,
}: AddMemberModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([]);
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useDebounce(searchText, 400);

  const {userCollections, isLoading} = useSearchAssignableUsers({
    roomId,
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: Boolean(roomId),
    search: debouncedSearch,
  });

  const handleSaveAddMembers = async () => {};

  return (
    <Modal visible={isOpen} onBackdropPress={onClose}>
      <View style={styles.wrapper}>
        <Text category="h5" style={{textAlign: 'center', marginBottom: 15}}>
          Add member
        </Text>
        <Input
          style={{marginHorizontal: 15, marginBottom: 8}}
          placeholder="Username..."
          size="large"
          accessoryLeft={<Icon name="search-outline" />}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <UserPicker
          wrapperStyle={{marginHorizontal: 10}}
          selectedUsers={selectedUsers}
          onSelectedUsersChange={setSelectedUsers}
          userCollections={userCollections || []}
          loading={isLoading}
        />
        <Button onPress={handleSaveAddMembers}>Save</Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgray',
    width: 365,
    height: 535,
    padding: 0,
    backgroundColor: 'white',
    paddingTop: 10,
  },
});
