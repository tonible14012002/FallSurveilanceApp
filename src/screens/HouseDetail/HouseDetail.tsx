import {useNavigation} from '@react-navigation/native';
import {
  Avatar,
  Divider,
  Layout,
  List,
  Modal,
  Text,
} from '@ui-kitten/components';
import {Pressable} from 'react-native';
import {useHouseDetailContext} from '~/components/HouseDetail';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useDisclosure} from '~/hooks/common';

export default function HouseDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {houseId, setHouseId} = useHouseDetailContext();
  const {isOpen, onClose, onOpen} = useDisclosure();
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
                <Text category="h6">Tony's House {houseId ?? ''}</Text>
                <Icon name="chevron-down-outline" />
              </Pressable>
            }
          />
        }>
        <Text>Hello world</Text>
      </ScreenLayout>
      {/* FIXME: Migrate to Bottom Sheet component later */}
      <Modal visible={isOpen} onBackdropPress={onClose}>
        <Layout
          style={{
            width: 380,
            maxHeight: 380,
            elevation: 3,
            borderRadius: 16,
            overflow: 'hidden',
          }}>
          <List
            data={[1, 2, 3, 4, 5, 6, 7]}
            ItemSeparatorComponent={Divider}
            renderItem={({index}) => (
              <ListItem
                onPressHandler={() => {
                  setHouseId(String(index + 1));
                  onClose();
                }}
                title={`House ${index + 1}`}
                subTitle="2 members"
                rightEle={
                  houseId === String(index + 1) ? (
                    <Icon size="small" name="checkmark-outline" />
                  ) : null
                }
                level="1"
              />
            )}
          />
        </Layout>
      </Modal>
    </>
  );
}
