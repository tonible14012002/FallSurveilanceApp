import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {Pressable} from 'react-native';
import {
  HousesSelectModal,
  useHouseDetailContext,
} from '~/components/HouseDetail';
import Icon from '~/components/core/Icon';
import List from '~/components/core/List';
import ScreenLayout from '~/components/core/ScreenLayout';
import TabItem from '~/components/core/TabItem';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useDisclosure} from '~/hooks/common';
import {useFetchHouseDetail} from '~/hooks/useFetchHouseDetail';

export default function HouseDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {houseId, setHouseId} = useHouseDetailContext();
  const {isOpen, onClose, onOpen} = useDisclosure();

  const {detail} = useFetchHouseDetail(houseId, Boolean(houseId));
  const rooms = detail?.rooms ?? [];
  const owners = detail?.owners ?? []; //members here

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
        hasBottomBar
        topBar={
          <TopBar
            onBack={() => navigate('Home')}
            rightIcon={
              <Avatar
                source={{
                  uri: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/369053435_3628631834068330_6252299390237773315_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=0A4cTRL139QAX8I1rlU&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCYocC0VA5dKjoQC9EyWOqFvdGVMjfK2-dvlAh7NJUG9Q&oe=65B22743',
                }}
              />
            }
            title={
              <Pressable
                onPress={onOpen}
                style={({pressed}) => ({
                  opacity: pressed ? 0.7 : 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                })}>
                <Text category="h6">{detail?.name ?? ''}</Text>
                <Icon name="chevron-down-outline" />
              </Pressable>
            }
          />
        }>
        <UserList
          containerStyle={{marginBottom: 30}}
          listStyle={{gap: 10}}
          title={
            <Text category="s2" style={{opacity: 0.7}}>
              Members
            </Text>
          }
          detailNavigator={
            <Button
              style={{
                borderRadius: 1000,
                width: 35,
                height: 35,
              }}
              status="control">
              <Icon size="giant" name="chevron-right-outline" />
            </Button>
          }>
          {owners.map(room => (
            <Avatar
              source={{
                uri: 'https://sm.ign.com/ign_za/cover/m/marvels-sp/marvels-spider-man-remastered_az82.jpg',
              }}
              style={{width: 50, height: 50}}
            />
          ))}
          <Button
            style={{
              borderRadius: 1000,
              width: 50,
              height: 50,
            }}
            status="control">
            <Icon name="plus" />
          </Button>
        </UserList>

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
              status="control">
              <Icon size="giant" name="chevron-right-outline" />
            </Button>
          }>
          {rooms.map(room => (
            <TabItem
              containerStyle={{width: 110, height: 100}}
              key={room.id}
              title={room.name}
              icon={<Icon name="tv" size="large" fill="#fff" />}
            />
          ))}
        </List>

        <List
          scrollable
          horizontal
          listStyle={{flexDirection: 'row'}}
          containerStyle={{marginTop: 30}}
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
              status="control">
              <Icon size="giant" name="chevron-right-outline" />
            </Button>
          }>
          {rooms.map(room => (
            <TabItem
              containerStyle={{width: 110, height: 100}}
              key={room.id}
              title={room.name}
              icon={<Icon name="tv" size="large" fill="#fff" />}
            />
          ))}
        </List>
      </ScreenLayout>
      <HousesSelectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
