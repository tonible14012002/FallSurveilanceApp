import {Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import RegisterForm from '~/components/Register/RegisterForm';
import Logo from '~/components/core/Logo';

export default function Register() {
  return (
    <Layout level="3" style={styles.container}>
      <Logo />
      <RegisterForm />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
