import {Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import NotSeenLabel from './NotSeenLabel';

interface TabItemProps {
  item: string;
  selected: boolean;
  isNotSeen?: boolean;
  style?: ViewStyle;
  pressHandler: () => void;
}

const TabItem = ({
  item,
  isNotSeen = false,
  style = {},
  pressHandler,
}: TabItemProps) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={[styles.tabItem, style]}>
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
  style?: ViewStyle;
  itemStyle?: ViewStyle;
}

export default function TabsRow({
  tabs,
  selectedIndex,
  setSelectedIndex,
  style = {},
  itemStyle = {},
}: TabsRowProps) {
  const handleSelectTab = (idx: number) => setSelectedIndex(idx);

  return (
    <View style={[styles.container, style]}>
      {tabs.map((item, idx) => (
        <TabItem
          item={item}
          selected={selectedIndex === idx}
          key={idx}
          isNotSeen
          style={itemStyle}
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
  },
});
