import {useNavigation} from '@react-navigation/native';
import {Button, Input, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {API, API_PATH} from '~/constants/api';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {BaseResponse} from '~/schema/common';
import {AddHouseSchema, AddHouseSchemaType} from '~/schema/form';
import AddMemberBottomSheet from './AddMemberBottomSheet';
import {useHouseDetailContext} from '../HouseDetail';
import {zodResolver} from '@hookform/resolvers/zod';

export default function AddHouseForm() {
  const [isLoading, setIsloading] = useState(false);
  const {user} = useAuthContext();
  const {renderIcon} = useRenderIcon();
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<AddHouseSchemaType>({
    // resolver: zodResolver(AddHouseSchema),
  });
  const {setHouseId} = useHouseDetailContext();
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const {data: respData} = await API.FALL_SURVEILANCE.post(
        {...data, owner_ids: [user?.id], member_ids: [user?.id], rooms: []},
        API_PATH.HOUSE_SERVICES.CREATE,
      ).json<BaseResponse<any>>(r => r);
      setHouseId(respData.id);
      navigation.navigate('Main');
      navigation.navigate('HouseDetail');
    } catch (e) {
      setIsloading(false);
      console.log(e);
    } finally {
      setIsloading(false);
    }
  });

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
        <AddMemberBottomSheet />
      </View>
      <Button
        disabled={isLoading}
        style={{
          marginTop: 10,
        }}
        onPress={() => onSubmit()}>
        <Text>Add</Text>
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
