import {Input, Text} from '@ui-kitten/components';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {UpdateProfileSchemaType} from '~/schema/form';

interface InfoDetailsProps {
  control: Control<UpdateProfileSchemaType>;
  errors: FieldErrors<UpdateProfileSchemaType>;
}

export const InfoDetails = ({control, errors}: InfoDetailsProps) => {
  const {renderIcon} = useRenderIcon();

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
              placeholder="Nickname"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
              textStyle={{
                color: '#000',
              }}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
          )}
          name="nickname"
        />
        {errors.nickname && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.nickname.message}
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
              accessoryLeft={renderIcon('email')}
              size="large"
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textStyle={{
                color: '#000',
              }}
              placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.email.message}
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
              accessoryLeft={renderIcon('phone')}
              size="large"
              placeholder="Phone number"
              onBlur={onBlur}
              onChangeText={onChange}
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
    </View>
  );
};

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
