import {Link, useNavigation} from '@react-navigation/native';
import {Button, Input, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {API, API_PATH} from '~/constants/api';
import {PublicScreenProps} from '~/constants/routes';
import {POPUPS, usePopupContext} from '~/context/popup';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {RegisterResponse} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';
import {RegisterSchemaType} from '~/schema/form';
import Icon from '../core/Icon';
import {formatFieldErrorMessage} from '~/libs/utils';

export default function RegisterForm() {
  const [isLoading, setIsloading] = useState(false);

  const {showPopup} = usePopupContext();
  const navigation = useNavigation<PublicScreenProps>();
  const {renderIcon} = useRenderIcon();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<RegisterSchemaType>({
    // resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: any) => {
    try {
      setIsloading(true);
      await API.FALL_SURVEILANCE.post(
        {...data, password_confirm: data.password ?? 'pw'},
        API_PATH.IDENTITY_SERVICES.REGISTER,
      ).json<BaseResponse<RegisterResponse>>(r => r);

      navigation.navigate('Login');
    } catch (e: any) {
      if (e?.response.status == 400) {
        showPopup(POPUPS.ALERT, {
          icon: (
            <Icon
              size="superGiant"
              name="alert-circle-outline"
              fill="#E72929"
            />
          ),
          title: 'Invalid information!',
          description: formatFieldErrorMessage(e?.json.data ?? {}),
        });
        return;
      }

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
              accessoryLeft={renderIcon('person')}
              size="large"
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
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
              accessoryLeft={renderIcon('phone')}
              size="large"
              placeholder="Phone number"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              textStyle={{
                color: '#000',
              }}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
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
              }}
              accessoryLeft={renderIcon('lock')}
              size="large"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
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
          justifyContent: 'center',
          gap: 5,
          marginTop: 5,
        }}>
        <Text category="s2">Already has an account?</Text>
        <Link to={{screen: 'Login'}} style={{textDecorationLine: 'underline'}}>
          Login
        </Link>
      </View>
      <Button
        style={{
          marginTop: 10,
        }}
        size="large"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}>
        Sign Up
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
