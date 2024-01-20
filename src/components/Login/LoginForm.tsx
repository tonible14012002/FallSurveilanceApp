import {zodResolver} from '@hookform/resolvers/zod';
import {Link} from '@react-navigation/native';
import {Button, CheckBox, Input, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import COLORS from '~/constants/colors';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {LoginSchema, LoginSchemaType} from '~/schema/form';
import {useNavigation} from '@react-navigation/native';

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();
  const {renderIcon} = useRenderIcon();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.formContainer}>
      <View style={{width: '100%'}}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{
                width: '100%',
                backgroundColor: COLORS.secondary,
                borderColor: COLORS.secondary,
              }}
              accessoryLeft={renderIcon('phone')}
              size="large"
              status="control"
              placeholder="Phone number"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="phone"
        />
        {errors.phone && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.phone.message}
          </Text>
        )}
      </View>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              style={{
                width: '100%',
                backgroundColor: COLORS.secondary,
                borderColor: COLORS.secondary,
              }}
              status="control"
              accessoryLeft={renderIcon('lock')}
              size="large"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.password.message}
          </Text>
        )}
      </View>
      <View
        style={{
          ...styles.flexContainer,
          justifyContent: 'space-between',
        }}>
        <CheckBox checked={rememberMe} onChange={value => setRememberMe(value)}>
          Remember me
        </CheckBox>
        <Link to={''} style={{color: 'white'}}>
          Forgot password?
        </Link>
      </View>
      <View
        style={{
          ...styles.flexContainer,
          justifyContent: 'center',
          gap: 5,
          marginTop: 5,
        }}>
        <Text category="s2">New user?</Text>
        <Link
          to={{screen: 'Register'}}
          style={{textDecorationLine: 'underline', color: COLORS.yellow}}>
          Register
        </Link>
      </View>
      <Button
        style={{
          marginTop: 10,
          backgroundColor: COLORS.yellow,
          borderColor: COLORS.yellow,
        }}
        size="large"
        status="basic"
        onPress={handleSubmit(onSubmit)}>
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 35,
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
