import {View} from 'react-native';
import {Skeleton} from '../core/Skeleton';

export const ScreenSkeleton = () => {
  return (
    <View style={{display: 'flex', gap: 12, padding: 16}}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <Skeleton width={200} height={40} />
        <Skeleton width={50} height={40} radius={900} />
      </View>
      <View
        style={{
          gap: 16,
        }}>
        <Skeleton width={100} height={50} />
        <Skeleton width={250} height={50} />
        <Skeleton width={250} height={50} />
      </View>
      <Skeleton width={340} height={24} />
      <Skeleton width={340} height={24} />
    </View>
  );
};
