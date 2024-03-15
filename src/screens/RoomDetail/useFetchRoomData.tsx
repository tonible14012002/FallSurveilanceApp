import {useRoute} from '@react-navigation/native';
import {useHouseDetailContext} from '~/components/HouseDetail';
import {useAuthContext} from '~/context/auth';
import {useFetchHouseRooms} from '~/hooks/useFetchHouseRooms';
import {useFetchRoomDetail} from '~/hooks/useFetchRoomDetail';

const useFetchRoomData = () => {
  const {user} = useAuthContext();
  const {houseId} = useHouseDetailContext();
  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const {detail} = useFetchRoomDetail(roomId, Boolean(roomId));
  const {rooms} = useFetchHouseRooms(houseId, Boolean(houseId));

  return {
    user,
    roomId,
    roomDetail: detail,
    rooms,
  };
};

export default useFetchRoomData;
