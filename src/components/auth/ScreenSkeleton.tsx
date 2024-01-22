import {View} from 'react-native';
import {Skeleton} from '../core/Skeleton';

export const ScreenSkeleton = () => {
  return (
    <View style={{display: 'flex', gap: 12}}>
      <Skeleton width={100} height={40} />
      <Skeleton width={100} height={40} />
      <Skeleton width={100} height={40} />
      <Skeleton width={100} height={40} />
      <Skeleton width={100} height={40} />
      <Skeleton width={100} height={40} />
    </View>
  );
};
