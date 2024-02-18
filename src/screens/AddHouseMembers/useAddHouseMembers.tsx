import {useHouseDetailContext} from '~/components/HouseDetail';
import {API, API_PATH} from '~/constants/api';
import {HOUSE_PERMISSIONS, HousePermission} from '~/constants/permissions';
import {HouseMemberWithPermissions} from '~/schema/api/house';
import {BasicUser} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';
import {AddMemberStep} from '.';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {mutate} from 'swr';
import {useSearchHouseAssignableMembers} from '~/hooks/useSearchHouseAssignableMembers';
import {PAGINATION} from '~/constants/common';
import {useDebouncedText} from '~/hooks/common/useDebouncedText';

interface Props {
  selectedUsers: BasicUser[];
  usersWithHousePermissions: HouseMemberWithPermissions[];
  setUsersWithHousePermissions: (users: HouseMemberWithPermissions[]) => void;
  setStep: (step: AddMemberStep) => void;
  setSelectedUser: (user?: HouseMemberWithPermissions) => void;
}

export const useAddHouseMembers = (props: Props) => {
  const {
    selectedUsers,
    setSelectedUser,
    setStep,
    setUsersWithHousePermissions,
    usersWithHousePermissions,
  } = props;

  const [isAddLoading, setIsAddLoading] = useState(false);

  const {houseId} = useHouseDetailContext();
  const {
    text: searchText,
    debouncedText: debouncedSearchText,
    changeText,
  } = useDebouncedText();
  const {
    userCollections,
    isLoading: isLoadingUsers,
    mutate: mutateAssignableUsers,
  } = useSearchHouseAssignableMembers({
    houseId: houseId!,
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: Boolean(houseId),
    search: debouncedSearchText,
  });
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();

  const handleNavigateAssignPermissionsStep = () => {
    const tempUsersWithHousePermissions: HouseMemberWithPermissions[] = [];
    selectedUsers.forEach(user => {
      const existingUser = usersWithHousePermissions.find(
        item => item.id === user.id,
      );
      if (!existingUser) {
        tempUsersWithHousePermissions.push({
          ...user,
          house_permissions: Object.keys(
            HOUSE_PERMISSIONS,
          ) as HousePermission[],
        });
      } else {
        tempUsersWithHousePermissions.push(existingUser);
      }
    });

    setUsersWithHousePermissions(tempUsersWithHousePermissions);

    setStep('ASSIGN_PERMISSIONS');
  };

  const handleSubmitChangeMemberPermission = (
    user: HouseMemberWithPermissions,
    permissions: HousePermission[],
  ) => {
    setUsersWithHousePermissions(
      usersWithHousePermissions.map(item => {
        if (item.id === user.id) {
          return {...item, house_permissions: permissions};
        }
        return item;
      }),
    );
    setSelectedUser(undefined);
  };

  const handleDoneAddMembers = async () => {
    try {
      setIsAddLoading(true);
      await API.FALL_SURVEILANCE.post(
        {
          add_members: usersWithHousePermissions.map(
            ({id, house_permissions}) => ({id, house_permissions}),
          ),
        },
        API_PATH.HOUSE_SERVICES.HOUSE_MEMBERS(houseId!),
      ).json<BaseResponse<any>>(r => r);

      Alert.alert('Members added!');

      await mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);
      await mutateAssignableUsers();

      navigate('HouseDetail');
    } catch (error) {
      console.log({error});
      Alert.alert('Fail to add member!', JSON.stringify(error));
    } finally {
      setIsAddLoading(false);
    }
  };

  return {
    searchText,
    changeText,
    isLoadingUsers,
    userCollections,
    isAddLoading,
    handleNavigateAssignPermissionsStep,
    handleSubmitChangeMemberPermission,
    handleDoneAddMembers,
  };
};
