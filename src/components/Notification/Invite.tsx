import {StyleSheet, TouchableOpacity, View} from 'react-native';
import NotSeenLabel from '../core/NotSeenLabel';
import {Avatar, Icon, Text} from '@ui-kitten/components';
import LogoImg from '~/assets/images/logo.png';

interface InviteItemProps {
  item: string;
  isNotSeen?: boolean;
  status: 'pending' | 'accepted' | 'rejected';
  pressHandler: () => void;
}

const InviteItem = ({
  isNotSeen = false,
  status,
  pressHandler,
}: InviteItemProps) => {
  const __renderPendingAction = () => (
    <View style={styles.inviteAction}>
      <Icon name="checkmark-circle-2" style={{width: 24, height: 24}} />
      <Icon name="close" style={{width: 32, height: 32}} />
    </View>
  );

  const __renderAcceptedStatus = () => (
    <Icon name="checkmark-outline" style={{width: 24, height: 24}} />
  );

  const __renderRejectedStatus = () => (
    <Icon name="close-circle-outline" style={{width: 24, height: 24}} />
  );

  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.inviteItem}>
        <Icon name="trash-2-outline" style={{width: 24, height: 24}} />
        {isNotSeen ? (
          <NotSeenLabel style={{position: 'relative', top: 0, right: 0}} />
        ) : (
          <View style={{width: 8}} />
        )}
        <View
          style={{
            ...styles.inviteInformation,
          }}>
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

        <View style={styles.inviteStatus}>
          {status === 'accepted' && __renderAcceptedStatus()}
          {status === 'rejected' && __renderRejectedStatus()}
          {status === 'pending' && __renderPendingAction()}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Invite() {
  return (
    <View style={styles.listContainer}>
      {[0, 0, 0].map((item, _idx) => (
        <InviteItem
          status="rejected"
          key={_idx}
          item="invite"
          pressHandler={() => {}}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 35,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  inviteItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderBottomWidth: 0.9,
  },
  inviteStatus: {
    position: 'absolute',
    right: 5,
    top: 35,
  },
  inviteAction: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inviteInformation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    flex: 1,
    paddingLeft: 10,
  },
});
