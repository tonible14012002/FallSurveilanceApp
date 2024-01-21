import {Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import LoginForm from '~/components/Login/LoginForm';
import Logo from '~/components/core/Logo';
import COLORS from '~/constants/colors';

export default function Login() {
  return (
    <Layout level="3" style={styles.container}>
      <Logo />
      <LoginForm />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});
