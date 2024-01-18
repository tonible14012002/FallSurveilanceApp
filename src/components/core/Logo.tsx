import {Image, StyleSheet, View} from 'react-native';
import LogoImg from '../../assets/images/logo.png';
import {Text} from '@ui-kitten/components';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={LogoImg} width={120} height={120} />
      <Text category="h3">Fall Surveillance</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
