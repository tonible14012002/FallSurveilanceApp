import {Link} from '@react-navigation/native';
import {Button, Input, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {LoginFormSchemaType} from '~/schema/form';
import {API, API_PATH} from '~/constants/api';
import {BaseResponse} from '~/schema/common';
import {requestUserPermission} from '~/libs/notification';
import {formatFieldErrorMessage} from '~/libs/utils';
import {showToast} from '~/libs/toast';
import {ToastColorEnum} from '../ToastMessage/ToastColorEnum';
import {useAuthContext} from '~/context/auth';

export default function LoginForm() {
  const [isLoading, setIsloading] = useState(false);

  const {login} = useAuthContext();
  const {renderIcon} = useRenderIcon();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginFormSchemaType>({});
  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      const user = await login?.(data);
      showToast('Login Succeed', ToastColorEnum.Succes);

      try {
        const token = await requestUserPermission();
        if (token) {
          await API.FALL_SURVEILANCE_NOTI.post(
            {
              userId: user?.id as string,
              token,
            },
            API_PATH.NOTIFICATION_SERVICES.REGISTER_TOKEN,
          ).json<BaseResponse<any>>(r => r);
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e: any) {
      console.log('asdjfiaoisdj');
      if (e?.response?.status === 400 && e?.json.data) {
        showToast(
          `Invalid information\n${formatFieldErrorMessage(e?.json.data ?? {})}`,
          ToastColorEnum.Error,
        );
        return;
      }

      if (e?.response?.status === 401) {
        showToast('Invalid credentials', ToastColorEnum.Error);
        return;
      }
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
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
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
              accessoryLeft={renderIcon('lock')}
              size="large"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
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
          justifyContent: 'center',
          gap: 5,
          marginTop: 5,
        }}>
        <Text category="s2">New user?</Text>
        <Link to={{screen: 'Register'}}>Register</Link>
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
