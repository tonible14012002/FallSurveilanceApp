import {Button, Text} from '@ui-kitten/components';
import List from '../core/List';
import Icon from '../core/Icon';
import {Room} from '~/schema/api/house';
import TabItem from '../core/TabItem';
import {RoomModal} from './RoomModal';
import {useDisclosure} from '~/hooks/common';
import {DeviceModal} from './DeviceModal';

interface DevicesListProps {
  devices: Room[];
}

export const DevicesList = ({devices}: DevicesListProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <>
      <List
        scrollable
        horizontal
        listStyle={{flexDirection: 'row'}}
        title={
          <Text category="s2" style={{opacity: 0.7}}>
            Devices
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
        {devices.map(device => (
          <TabItem
            containerStyle={{width: 110, height: 100}}
            key={device.id}
            title={device.name}
            icon={<Icon name="tv" size="large" fill="#fff" />}
          />
        ))}
      </List>
      <DeviceModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
