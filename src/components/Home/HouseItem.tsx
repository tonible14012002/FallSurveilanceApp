import {useNavigation} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import ListItem from '../core/ListItem';

export default function HouseItem() {
  const navigation = useNavigation<any>();

  const handleOnPress = () => navigation.navigate('HouseDetail', {});

  const __renderTitle = () => <Text>House 1</Text>;

  const __renderSubTitle = () => (
    <View style={styles.houseSmallInfo}>
      <Text appearance="hint" category="c1">
        2 members
      </Text>
      <Text>•</Text>
      <Text appearance="hint" category="c1">
        2 rooms
      </Text>
    </View>
  );

  return (
    <ListItem
      title={__renderTitle()}
      subTitle={__renderSubTitle()}
      onPressHandler={handleOnPress}
    />
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
