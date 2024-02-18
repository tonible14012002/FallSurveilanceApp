import {Text} from '@ui-kitten/components';
import ScreenLayout from '~/components/core/ScreenLayout';
import {useRoomMemberContext} from './context';
import TopBar from '~/components/core/TopBar';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useFetchRoomMembers} from '~/hooks/Room/useFetchRoomMembers';
import {UserPermissionsModal} from '~/components/common/UserPermissonsModal';

export const RoomMembers = () => {
  const {roomId} = useRoomMemberContext();
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {members, isFirstLoading, mutate} = useFetchRoomMembers(
    roomId,
    !!roomId,
  );

  if (isFirstLoading) {
    return (
      <ScreenLayout
        topBar={
          <TopBar
            title="Room members"
            onBack={() => navigate('RoomDetail', {roomId: roomId as string})}
          />
        }>
        <Text>Loading</Text>
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout
      topBar={
        <TopBar
          title="Room members"
          onBack={() => navigate('RoomDetail', {roomId: roomId as string})}
        />
      }>
      {!!roomId && (
        <UserPermissionsModal
          members={members ?? []}
          roomId={roomId}
          onUpdatedPermissions={mutate}
        />
      )}
    </ScreenLayout>
  );
};
