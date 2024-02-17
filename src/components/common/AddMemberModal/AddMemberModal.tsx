import {Button, Input, Modal, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserPicker} from '~/components/UserPicker';
import Icon from '~/components/core/Icon';
import {BasicUser, User} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';

interface AddMemberModalProps {
  isOpen: boolean;
  searchText: string;
  setSearchText: (value: string) => void;
  userCollections: BaseResponse<User[]>[];
  isLoading: boolean;
  onSave: (users: BasicUser[]) => void;
  onClose: () => void;
}

export function AddMemberModal({
  isOpen,
  searchText,
  setSearchText,
  userCollections,
  isLoading,
  onSave,
  onClose,
}: AddMemberModalProps) {
  const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([]);

  const handleSaveMembers = async () => {
    onSave(selectedUsers);
  };

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
        <Button
          onPress={handleSaveMembers}
          style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
          Save
        </Button>
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
