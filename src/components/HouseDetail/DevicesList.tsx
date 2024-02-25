import {useNavigation} from '@react-navigation/native';
import {Button, Text} from '@ui-kitten/components';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {Device} from '~/schema/api/house';
import Icon from '../core/Icon';
import List from '../core/List';
import TabItem from '../core/TabItem';

interface DevicesListProps {
  devices: Device[];
}

export const DevicesList = ({devices}: DevicesListProps) => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();

  const isDevicesEmpty = !devices.length;

  const handleNavigateToAddDevice = () => {
    navigate('Main');
    navigate('AddDevice');
  };

  const handleNavigateToDeviceDetail = (deviceId: string) => {
    navigate('Main');
    navigate('DeviceDetail', {deviceId});
  };

  return (
    <>
      <List
        scrollable
        horizontal
        listStyle={{flexDirection: 'row'}}
        title={
          <Text
            category="label"
            style={{marginBottom: isDevicesEmpty ? -5 : 0}}>
            Devices
          </Text>
        }
        detailNavigator={
          <Button
            style={{
              borderRadius: 1000,
              width: 35,
              height: 35,
              marginBottom: isDevicesEmpty ? -20 : 0,
            }}
            status="control"
            onPress={handleNavigateToAddDevice}>
            <Icon name="plus-outline" />
          </Button>
        }>
        {isDevicesEmpty && <Text category="s2">None</Text>}
        {devices.map(device => (
          <TabItem
            containerStyle={{width: 110, height: 100}}
            key={device.id}
            title={device.name}
            icon={<Icon name="tv" size="large" />}
            onPressHandler={() => handleNavigateToDeviceDetail(device.id)}
          />
        ))}
      </List>
    </>
  );
};
