import {Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import COLORS from '~/constants/colors';
import NotSeenLabel from './NotSeenLabel';

interface TabItemProps {
  item: string;
  selected: boolean;
  isNotSeen?: boolean;
  pressHandler: () => void;
}

const TabItem = ({
  item,
  selected,
  isNotSeen = false,
  pressHandler,
}: TabItemProps) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View
        style={{
          ...styles.tabItem,
          backgroundColor: selected ? COLORS.yellow : COLORS.secondary,
        }}>
        <Text style={{fontWeight: 'bold'}}>{item}</Text>
        {isNotSeen && <NotSeenLabel />}
      </View>
    </TouchableOpacity>
  );
};

interface TabsRowProps {
  tabs: string[];
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
}

export default function TabsRow({
  tabs,
  selectedIndex,
  setSelectedIndex,
}: TabsRowProps) {
  const handleSelectTab = (idx: number) => setSelectedIndex(idx);

  return (
    <View style={styles.container}>
      {tabs.map((item, idx) => (
        <TabItem
          item={item}
          selected={selectedIndex === idx}
          key={idx}
          pressHandler={() => handleSelectTab(idx)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  tabItem: {
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontWeight: 'bold',
  },
  notSeenLabel: {
    position: 'absolute',
    width: 8,
    height: 8,
    top: -4,
    right: -3,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: COLORS.yellow,
  },
});
