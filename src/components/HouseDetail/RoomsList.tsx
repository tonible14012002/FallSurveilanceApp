import {Button, Text} from '@ui-kitten/components';
import List from '../core/List';
import Icon from '../core/Icon';
import {HouseDetailRoom} from '~/schema/api/house';
import TabItem from '../core/TabItem';
import {RoomModal} from './RoomModal';
import {useDisclosure} from '~/hooks/common';
import {useHouseDetailContext} from './context';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';

interface RoomsListProps {
  rooms: HouseDetailRoom[];
}

export const RoomsList = ({rooms}: RoomsListProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {houseId} = useHouseDetailContext();
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();

  const handleNavigateRoomDetailScreen = (roomId: string) => {
    navigation.navigate('Main');
    navigation.navigate('RoomDetail', {roomId});
  };

  return (
    <>
      <List
        scrollable
        horizontal
        listStyle={{flexDirection: 'row'}}
        title={
          <Text category="s2" style={{opacity: 0.7}}>
            Rooms
          </Text>
        }
        detailNavigator={
          <Button
            style={{
              borderRadius: 1000,
              width: 35,
              height: 35,
            }}
            status="control"
            onPress={onOpen}>
            <Icon name="plus-outline" />
          </Button>
        }>
        {rooms.map(room => (
          <TabItem
            containerStyle={{width: 110, height: 100}}
            key={room.id}
            title={room.name}
            icon={<Icon name="tv" size="large" />}
            onPressHandler={() => handleNavigateRoomDetailScreen(room.id)}
          />
        ))}
      </List>
      <RoomModal isOpen={isOpen} houseId={houseId ?? ''} onClose={onClose} />
    </>
  );
};
