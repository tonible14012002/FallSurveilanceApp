import {Link, useNavigation} from '@react-navigation/native';
import {Button, CheckBox, Input, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {LoginFormSchemaType} from '~/schema/form';
import {API, API_PATH} from '~/constants/api';
import {BaseResponse} from '~/schema/common';
import {LoginResponse} from '~/schema/api/identity';
import {useAuthContext} from '~/context/auth';
import jwtManager from '~/libs/jwt/jwtManager';
import {PublicScreenProps} from '~/constants/routes';

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const {setUser} = useAuthContext();
  const navigation = useNavigation<PublicScreenProps>();
  const {renderIcon} = useRenderIcon();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginFormSchemaType>({
    // resolver: zodResolver(LoginFormSchema),
  });
  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      const resp = await API.FALL_SURVEILANCE.post(
        {username: data.phone, password: data.password},
        API_PATH.IDENTITY_SERVICES.LOGIN,
      ).json<BaseResponse<LoginResponse>>(r => r);

      const {user, access, refresh} = resp.data;
      setUser(user);
      jwtManager.setToken(access);
      jwtManager.setRefreshToken(refresh);
      navigation.navigate('Private');
    } catch (e) {
      setIsloading(false);
      console.log(e);
    } finally {
      setIsloading(false);
    }
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
              }}
              accessoryLeft={renderIcon('person-outline')}
              size="large"
              status="control"
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
              textStyle={{
                color: '#000',
              }}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
          )}
          name="username"
        />
        {errors.username && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.username.message}
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
              }}
              status="control"
              accessoryLeft={renderIcon('lock')}
              size="large"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textStyle={{
                color: '#000',
              }}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
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
        <Link to={''}>Forgot password?</Link>
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
          style={{textDecorationLine: 'underline'}}>
          Register
        </Link>
      </View>
      <Button
        disabled={isLoading}
        style={{
          marginTop: 10,
        }}
        size="large"
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
