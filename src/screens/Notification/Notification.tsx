import {Avatar, Icon, Text} from '@ui-kitten/components';
import ListItem from '~/components/core/ListItem';
import {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import ScreenLayout from '~/components/core/ScreenLayout';
import TabsRow from '~/components/core/TabsRow';
import TopBar from '~/components/core/TopBar';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {NotificationItem} from '~/components/common/NotificationItem';
import List from '~/components/core/List';

const TABS = ['Detection', 'Invite'];

export default function Notification() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useAuthContext();

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
        scrollable
        listStyle={{
          marginTop: 5,
          paddingHorizontal: 8,
          paddingBottom: 50,
          gap: 4,
        }}>
        <NotificationItem
          isNotSeen
          title={
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{maxWidth: 265}}>
              <Text style={{fontWeight: '800'}}>Khoa Truong</Text> added you to
              his house
            </Text>
          }
          subTitle={
            <Text category="p2" style={{color: 'gray'}}>
              20 minutes ago
            </Text>
          }
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI__yjUO07TXv6pLC3g-B5Z5hixZjITUTrJKEs0CmkHA&s"
        />
        <NotificationItem
          title={
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{maxWidth: 265}}>
              <Text style={{fontWeight: '800'}}>Khoa Truong</Text> added you to
              his house
            </Text>
          }
          subTitle={
            <Text category="p2" style={{color: 'gray'}}>
              20 minutes ago
            </Text>
          }
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI__yjUO07TXv6pLC3g-B5Z5hixZjITUTrJKEs0CmkHA&s"
        />
      </List>
    </ScreenLayout>
  );
}
