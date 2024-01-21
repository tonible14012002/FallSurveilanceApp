import {Icon, Layout, List, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import FloatButton from '~/components/core/FloatButton';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';

export default function Home() {
  return (
    <ScreenLayout
      topBar={<TopBar title="Houses" onBack={() => {}} />}
      floatEl={<FloatButton pressHandler={() => {}} />}
      hasPadding>
      <List
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        style={{backgroundColor: 'transparent'}}
        renderItem={i => (
          <ListItem
            wrapperStyle={{
              borderRadius: 24,
            }}
            size="large"
            leftIcon={<Icon name="home" />}
            isLeftIcon
            rightEle={
              <Layout
                level="1"
                style={{
                  borderRadius: 1000,
                  padding: 10,
                }}>
                <View
                  style={{
                    width: 16,
                    height: 16,
                  }}>
                  <Icon name="chevron-right-outline" />
                </View>
              </Layout>
            }
            title={`House ${i.index}`}
            subTitle={
              <View style={styles.houseSmallInfo}>
                <Text appearance="hint" category="c1">
                  2 members
                </Text>
                <Text>•</Text>
                <Text appearance="hint" category="c1">
                  2 rooms
                </Text>
              </View>
            }
          />
        )}
      />
      <View style={{height: 20}} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  houseSmallInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
