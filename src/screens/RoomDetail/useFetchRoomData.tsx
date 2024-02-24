import {useRoute} from '@react-navigation/native';
import {useHouseDetailContext} from '~/components/HouseDetail';
import {PAGINATION} from '~/constants/common';
import {useAuthContext} from '~/context/auth';
import {useFetchHouseRooms} from '~/hooks/useFetchHouseRooms';
import {useFetchRoomDetail} from '~/hooks/useFetchRoomDetail';
import {useSearchAssignableUsers} from '~/hooks/useSearchAssignableUsers';

interface Props {
  isOpenAddMember: boolean;
  debouncedSearch: string;
}

const useFetchRoomData = ({isOpenAddMember, debouncedSearch}: Props) => {
  const {user} = useAuthContext();
  const {houseId} = useHouseDetailContext();
  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const {userCollections, isLoading} = useSearchAssignableUsers({
    roomId,
    page: 1,
    pageSize: PAGINATION.SMALL,
    allowFetch: true,
    search: debouncedSearch,
  });

  const {detail} = useFetchRoomDetail(roomId, Boolean(roomId));
  console.log({detail});
  const {rooms} = useFetchHouseRooms(houseId, Boolean(houseId));

  return {
    user,
    roomId,
    isLoadingUserCollections: isLoading,
    userCollections,
    roomDetail: detail,
    rooms,
  };
};

export default useFetchRoomData;
