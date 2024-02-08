import {useNavigation} from '@react-navigation/native';
import {Avatar, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {AvatarSetting} from '~/components/Account';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {useAuthContext} from '~/context/auth';

export default function Account() {
  const {user} = useAuthContext();

  return (
    <ScreenLayout hasPadding isScrollable topBar={<TopBar title="Account" />}>
      <Layout style={styles.wrapper}>
        <AvatarSetting avatarUrl={user?.avatar} />
      </Layout>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
