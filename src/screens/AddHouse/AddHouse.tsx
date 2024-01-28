import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import AddHouseForm from '~/components/AddHouse/AddHouseForm';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';

export default function AddHouse() {
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();

  const onBackPress = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <ScreenLayout
      topBar={<TopBar title="Add House" onBack={onBackPress} />}
      isScrollable>
      <AddHouseForm />
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
