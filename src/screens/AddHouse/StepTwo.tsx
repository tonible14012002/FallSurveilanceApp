import {Input, Button} from '@ui-kitten/components';
import {useState} from 'react';
import {View} from 'react-native';
import Icon from '~/components/core/Icon';
import {PAGINATION} from '~/constants/common';
import {useSearchUsers} from '~/hooks/useSearchUsers';
import {useDebounce} from '~/libs/hooks/useDebounce';
import {BasicUser} from '~/schema/api/identity';
import {UserPicker} from '~/components/UserPicker';

interface StepTwoProps {
  selectedUsers: BasicUser[];
  onSelectedUsersChange: (_: BasicUser[]) => void;
  onFinished: () => void;
}

export const StepTwo = (props: StepTwoProps) => {
  const {
    selectedUsers,
    onSelectedUsersChange: setSelectedUsers,
    onFinished,
  } = props;
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 400);

  const {userCollections, isLoading} = useSearchUsers({
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: true,
    search: debouncedSearch,
  });

  const onConfirm = () => {
    onFinished();
  };

  return (
    <View style={{flex: 1, gap: 16, position: 'relative'}}>
      <Input
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
      <View
        style={{
          bottom: 0,
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.1)',
          marginTop: -16,
          marginHorizontal: -16,
        }}>
        <Button size="large" style={{width: '100%'}} onPress={onConfirm}>
          Confirm
        </Button>
      </View>
    </View>
  );
};
