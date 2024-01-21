import {Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import HouseItem from './HouseItem';

interface HousesListProps {
  title: string;
}

export default function HousesList({title}: HousesListProps) {
  return (
    <View style={styles.container}>
      <Text category="s2" style={{opacity: 0.7, marginBottom: 10}}>
        {title}
      </Text>
      <View style={styles.housesList}>
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <HouseItem key={idx} />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 15,
  },
  housesList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 10,
  },
});
