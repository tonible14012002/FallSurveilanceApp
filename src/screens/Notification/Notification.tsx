import {Icon, Layout, Text} from '@ui-kitten/components';
import {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import HouseSearchBar from '~/components/Home/HouseSearchBar';
import MyHousesList from '~/components/Home/HousesList';
import Detection from '~/components/Notification/Detection';
import Invite from '~/components/Notification/Invite';
import HeaderRow from '~/components/core/HeaderRow';
import TabsRow from '~/components/core/TabsRow';
import COLORS from '~/constants/colors';

const TABS = ['Detection', 'Invite'];

const TABS_CONTENT: Record<(typeof TABS)[number], () => React.JSX.Element> = {
  Detection,
  Invite,
};

export default function Notification() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const Content = useMemo(
    () => TABS_CONTENT[TABS[selectedIndex]],
    [selectedIndex],
  );

  return (
    <Layout level="3" style={styles.container}>
      <HeaderRow title="Notification" />
      <View style={{paddingHorizontal: 10, paddingTop: 15}}>
        <TabsRow
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          tabs={TABS}
        />
        <ScrollView>
          <Content />
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: COLORS.primary,
    color: 'white',
  },
});
