import {zodResolver} from '@hookform/resolvers/zod';
import {Link} from '@react-navigation/native';
import {Button, Input, Text} from '@ui-kitten/components';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {RegisterSchema, RegisterSchemaType} from '~/schema/form';

export default function RegisterForm() {
  const {renderIcon} = useRenderIcon();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
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
              status="control"
              placeholder="Fullname"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="fullname"
        />
        {errors.fullname && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.fullname.message}
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
        status="basic"
        onPress={handleSubmit(onSubmit)}>
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
