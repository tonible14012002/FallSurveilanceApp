import {Avatar, List, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {NotificationItem} from '~/components/common/NotificationItem';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import ScreenLayout from '~/components/core/ScreenLayout';
import TabsRow from '~/components/core/TabsRow';
import TopBar from '~/components/core/TopBar';
import {PAGINATION} from '~/constants/common';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {useFetchPrivateNotification} from '~/hooks/useFetchPrivateNotification';
import {
  InviteToHouseNotificationMeta,
  InviteToRoomNotificationMeta,
  Notification,
  PrivateNotificationMeta,
} from '~/schema/api/notification';
import {BaseResponse} from '~/schema/common';
import {PRIVATE_NOTIFICATION_CODE} from './constants';

const TABS = ['Detection', 'Invite'];

type PrivateNotificationCodeType = keyof typeof PRIVATE_NOTIFICATION_CODE;

export default function PrivateNotification() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useAuthContext();

  const {notificationsCollection} = useFetchPrivateNotification({
    allowFetch: !!user,
    page: 1,
    pageSize: PAGINATION.SMALL,
  });

  const __renderNotificationText = (
    eventCode: PrivateNotificationCodeType,
    meta: PrivateNotificationMeta,
  ) => {
    let title = '';
    let boldWords = [];

    if (eventCode === PRIVATE_NOTIFICATION_CODE.INVITED_TO_HOUSE) {
      const invitor = (meta as InviteToHouseNotificationMeta).invitor;
      boldWords.push(invitor.nickname);

      title += ' added you to house ';

      const house = (meta as InviteToHouseNotificationMeta).house;
      boldWords.push(house.name);
    }
    if (eventCode === PRIVATE_NOTIFICATION_CODE.INVITED_TO_ROOM) {
      const invitor = (meta as InviteToRoomNotificationMeta).invitor;
      boldWords.push(invitor.nickname);

      title += ' added you to room ';
      const room = (meta as InviteToRoomNotificationMeta).room;
      boldWords.push(room.name);
    }

    return (
      <Text
        category="s2"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{maxWidth: 270}}>
        <Text style={{fontWeight: '800'}}>{boldWords[0]}</Text>
        {title}
        <Text style={{fontWeight: '800'}}>{boldWords[1]}</Text>
      </Text>
    );
  };

  const __renderNotificationsCollection = ({
    item,
  }: {
    item: BaseResponse<Notification<PrivateNotificationMeta>[]>;
  }) => {
    const {data} = item;
    return (
      <List
        key={item.pageable?.next_page}
        data={data}
        renderItem={({item: noti}) => {
          const avatar = noti.meta.invitor.avatar;
          return (
            <NotificationItem
              style={{marginBottom: 5}}
              isNotSeen={!noti.is_seen}
              title={__renderNotificationText(
                noti.event_code as PrivateNotificationCodeType,
                noti.meta,
              )}
              subTitle={
                <Text category="p2" style={{color: 'gray'}}>
                  {noti.created_at}
                </Text>
              }
              avatarUrl={avatar}
            />
          );
        }}
      />
    );
  };

  return (
    <ScreenLayout
      topBar={
        <TopBar
          title="Notification"
          rightIcon={
            <>
              <Pressable style={{paddingHorizontal: 4}}>
                <Text category="s1" status="primary">
                  Filter
                </Text>
              </Pressable>
              <ProfileDropdown
                onClose={onClose}
                isOpen={isOpen}
                onOpen={onOpen}
                trigger={
                  <Avatar
                    source={{
                      uri: user?.avatar,
                    }}
                  />
                }
              />
            </>
          }
        />
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}>
        <TabsRow
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          tabs={TABS}
        />
        <TouchableOpacity>
          <Text
            category="s2"
            status="primary"
            style={{textDecorationLine: 'underline'}}>
            Mark all as read
          </Text>
        </TouchableOpacity>
      </View>

      <List
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            backgroundColor: 'transparent',
            marginTop: 10,
            paddingHorizontal: 8,
          },
        ]}
        scrollEnabled
        data={notificationsCollection ?? []}
        renderItem={__renderNotificationsCollection}
      />
    </ScreenLayout>
  );
}
