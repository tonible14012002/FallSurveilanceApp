import {Icon} from '@ui-kitten/components';
import ListItem from '~/components/core/ListItem';
import {useState} from 'react';
import {View} from 'react-native';
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
    <ScreenLayout topBar={<TopBar title="Notification" />}>
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
