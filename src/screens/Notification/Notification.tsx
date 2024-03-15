import {Avatar, Icon, Text} from '@ui-kitten/components';
import ListItem from '~/components/core/ListItem';
import {useState} from 'react';
import {Pressable, View} from 'react-native';
import ScreenLayout from '~/components/core/ScreenLayout';
import TabsRow from '~/components/core/TabsRow';
import TopBar from '~/components/core/TopBar';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';

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
      <TabsRow
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        tabs={TABS}
      />
      <ListItem
        level="2"
        size="large"
        isLeftIcon
        rightEle={
          <View
            style={{
              width: 16,
              height: 16,
            }}>
            <Icon name="checkmark-outline" />
          </View>
        }
        title={'House'}
      />
    </ScreenLayout>
  );
}
