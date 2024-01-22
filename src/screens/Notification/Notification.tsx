import {Avatar, Icon, Text} from '@ui-kitten/components';
import ListItem from '~/components/core/ListItem';
import {useState} from 'react';
import {Pressable, View} from 'react-native';
// import Detection from '~/components/Notification/Detection';
// import Invite from '~/components/Notification/Invite';
import ScreenLayout from '~/components/core/ScreenLayout';
import TabsRow from '~/components/core/TabsRow';
import TopBar from '~/components/core/TopBar';

const TABS = ['Detection', 'Invite'];

// const TABS_CONTENT: Record<(typeof TABS)[number], () => React.JSX.Element> = {
//   Detection,
//   Invite,
// };

export default function Notification() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const Content = useMemo(
  //   () => TABS_CONTENT[TABS[selectedIndex]],
  //   [selectedIndex],
  // );

  return (
    <ScreenLayout
      topBar={
        <TopBar
          title="Notification"
          rightIcon={
            <>
              <Pressable>
                <Text category="s2" status="primary">
                  Filter
                </Text>
              </Pressable>
              <Avatar
                source={{
                  uri: 'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-1/369053435_3628631834068330_6252299390237773315_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=0A4cTRL139QAX8I1rlU&_nc_ht=scontent.fhan3-3.fna&oh=00_AfCYocC0VA5dKjoQC9EyWOqFvdGVMjfK2-dvlAh7NJUG9Q&oe=65B22743',
                }}
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
