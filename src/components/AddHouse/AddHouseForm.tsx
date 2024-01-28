import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Input, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {AddHouseSchema, AddHouseSchemaType} from '~/schema/form';
import AddMemberBottomSheet from './AddMemberBottomSheet';
import List from '../core/List';

export default function AddHouseForm() {
  const [isLoading, setIsloading] = useState(false);
  const {renderIcon} = useRenderIcon();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<AddHouseSchemaType>({
    resolver: zodResolver(AddHouseSchema),
  });
  const onSubmit = async (data: any) => {
    try {
      console.log({data});
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
              accessoryLeft={renderIcon('edit-2-outline')}
              size="large"
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.name.message}
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
              accessoryLeft={renderIcon('home-outline')}
              size="large"
              placeholder="Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="address"
        />
        {errors.address && (
          <Text category="s2" status="danger" style={{marginTop: 5}}>
            {errors.address.message}
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
              placeholder="Phone"
              onBlur={onBlur}
              onChangeText={onChange}
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
        <AddMemberBottomSheet />
      </View>
      <Button
        disabled={isLoading}
        style={{
          marginTop: 10,
        }}
        size="large"
        onPress={handleSubmit(onSubmit)}>
        Add
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
});
