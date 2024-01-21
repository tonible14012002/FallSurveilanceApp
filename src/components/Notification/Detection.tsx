import {StyleSheet, TouchableOpacity, View} from 'react-native';
import NotSeenLabel from '../core/NotSeenLabel';
import {Avatar, Icon, Text} from '@ui-kitten/components';
import COLORS from '~/constants/colors';
import LogoImg from '~/assets/images/logo.png';

interface DetectionItemProps {
  item: string;
  isNotSeen?: boolean;
  pressHandler: () => void;
}

const DetectionItem = ({
  item,
  isNotSeen = false,
  pressHandler,
}: DetectionItemProps) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.detectionItem}>
        <Icon
          name="trash-2-outline"
          style={{width: 24, height: 24}}
          fill={COLORS.danger}
        />
        {isNotSeen ? (
          <NotSeenLabel style={{position: 'relative', top: 0, right: 0}} />
        ) : (
          <View style={{width: 8}} />
        )}
        <Avatar source={LogoImg} size="medium" />
        <View style={{paddingLeft: 5}}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 3}}>
            <Text style={{opacity: 0.7}}>Fall detected at</Text>
            <Text style={{fontWeight: 'bold'}}>House 1</Text>
          </View>
          <Text category="s2" style={{opacity: 0.7}}>
            10 minutes ago
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Detection() {
  return (
    <View style={styles.listContainer}>
      {[0, 0, 0].map((item, _idx) => (
        <DetectionItem
          isNotSeen
          key={_idx}
          item="dfsf"
          pressHandler={() => {}}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 25,
    display: 'flex',
    gap: 5,
  },
  detectionItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 0.9,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
});
