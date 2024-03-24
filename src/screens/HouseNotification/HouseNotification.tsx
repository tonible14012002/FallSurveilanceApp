import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useFetchHouseDetail} from '~/hooks/useFetchHouseDetail';

export const HouseNotification = () => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {houseId} = route.params as {roomId: string};

  const {detail, isFirstLoading} = useFetchHouseDetail(houseId, true);
  if (isFirstLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScreenLayout
      isScrollable
      hasPadding
      topBar={
        <TopBar
          onBack={() => navigate('HouseDetail')}
          title={`${detail?.name} Notification`}
        />
      }
    />
  );
};
