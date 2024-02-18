import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHouseDetailContext} from '~/components/HouseDetail';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {HouseMemberWithPermissions} from '~/schema/api/house';
import {BasicUser} from '~/schema/api/identity';
import {AssignPermissions} from './AssignPermissions';
import {MembersPicker} from './MembersPicker';
import {useAddHouseMembers} from './useAddHouseMembers';

export type AddMemberStep = 'ADD' | 'ASSIGN_PERMISSIONS';

export const AddHouseMembers = () => {
  const [step, setStep] = useState<AddMemberStep>('ADD');
  const [selectedUser, setSelectedUser] =
    useState<HouseMemberWithPermissions>();
  const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([]);
  const [usersWithHousePermissions, setUsersWithHousePermissions] = useState<
    HouseMemberWithPermissions[]
  >([]);

  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();

  const handleNavigateBack = () => {
    if (step === 'ADD') {
      navigate('HouseDetail');
      return;
    }

    setStep('ADD');
  };

  const {
    searchText,
    changeText,
    isLoadingUsers,
    userCollections,
    isAddLoading,
    handleNavigateAssignPermissionsStep,
    handleSubmitChangeMemberPermission,
    handleDoneAddMembers,
  } = useAddHouseMembers({
    selectedUsers,
    setSelectedUser,
    setStep,
    setUsersWithHousePermissions,
    usersWithHousePermissions,
  });

  const styles = buildStyles(step);

  return (
    <ScreenLayout
      topBar={
        <TopBar
          title={step === 'ADD' ? 'Add members' : 'Assign Permissions'}
          onBack={handleNavigateBack}
        />
      }>
      <View style={styles.wrapper}>
        {step === 'ADD' && (
          <MembersPicker
            searchText={searchText}
            changeText={changeText}
            isLoading={isLoadingUsers}
            userCollections={userCollections}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            navigateNextStep={handleNavigateAssignPermissionsStep}
          />
        )}
        {step === 'ASSIGN_PERMISSIONS' && (
          <AssignPermissions
            isLoading={isAddLoading}
            members={usersWithHousePermissions}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            onSubmitChangeMemberPermission={handleSubmitChangeMemberPermission}
            onDoneAddMembers={handleDoneAddMembers}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

const buildStyles = (step: AddMemberStep) =>
  StyleSheet.create({
    wrapper: {
      padding: step === 'ADD' ? 15 : 0,
      height: '100%',
    },
  });
