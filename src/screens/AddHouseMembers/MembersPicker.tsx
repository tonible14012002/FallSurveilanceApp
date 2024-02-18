import {Button, Input} from '@ui-kitten/components';
import {UserPicker} from '~/components/UserPicker';
import {SpinnerDataLoadingShowcase} from '~/components/common/SpinnerDataLoadingShowcase';
import Icon from '~/components/core/Icon';
import {BasicUser, User} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';

interface MembersPickerProps {
  searchText: string;
  changeText: (value: string) => void;
  isLoading: boolean;
  userCollections?: BaseResponse<User[]>[];
  selectedUsers: BasicUser[];
  setSelectedUsers: (users: BasicUser[]) => void;
  navigateNextStep: () => void;
}

export const MembersPicker = (props: MembersPickerProps) => {
  const {
    searchText,
    changeText,
    isLoading,
    userCollections,
    selectedUsers,
    setSelectedUsers,
    navigateNextStep,
  } = props;

  return (
    <>
      <Input
        style={{marginBottom: 8}}
        placeholder="Username..."
        size="large"
        accessoryLeft={<Icon name="search-outline" />}
        value={searchText}
        onChangeText={text => changeText(text)}
      />

      <SpinnerDataLoadingShowcase
        isLoading={isLoading}
        dataLength={userCollections?.length}>
        <UserPicker
          wrapperStyle={{marginHorizontal: 10}}
          selectedUsers={selectedUsers}
          onSelectedUsersChange={setSelectedUsers}
          userCollections={userCollections ?? []}
          loading={false}
        />
      </SpinnerDataLoadingShowcase>

      <Button disabled={!!!selectedUsers.length} onPress={navigateNextStep}>
        Next
      </Button>
    </>
  );
};
