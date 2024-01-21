import {useNavigation} from '@react-navigation/native';
import {Button, Icon, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import ListItem from '../core/ListItem';

export default function HouseItem() {
  const navigation = useNavigation<any>();

  const handleOnPress = () => navigation.navigate('HouseDetail', {});

  const __renderLeftIcon = () => (
    <Icon name="home-outline" style={{width: 24, height: 24}} fill="#ffffff" />
  );

  const __renderTitle = () => <Text>House 1</Text>;

  const __renderSubTitle = () => (
    <View style={styles.houseSmallInfo}>
      <Text category="s2">2 members</Text>
      <Text>•</Text>
      <Text category="s2">2 rooms</Text>
    </View>
  );

  const __renderRightEle = () => (
    <Button
      style={{
        borderRadius: 50,
        width: 45,
        height: 45,
      }}
      status="warning">
      <View>
        <Icon
          name="arrow-right"
          fill="#ffffff"
          style={{width: 24, height: 24}}
        />
      </View>
    </Button>
  );

  return (
    <ListItem
      leftIcon={__renderLeftIcon()}
      title={__renderTitle()}
      subTitle={__renderSubTitle()}
      rightEle={__renderRightEle()}
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
    padding: 15,
    borderRadius: 25,
  },
  houseInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  houseSmallInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
