import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {mutate} from 'swr';
import {API, API_PATH} from '~/constants/api';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {CreateRoomResponse, House} from '~/schema/api/house';
import {BaseResponse} from '~/schema/common';
import {EditHouseSchemaType} from '~/schema/form';

interface RoomModalProps {
  isOpen: boolean;
  data?: House;
  onClose: () => void;
}

export function EditHouseModal({isOpen, data, onClose}: RoomModalProps) {
  const [isLoading, setIsloading] = useState(false);
  const {renderIcon} = useRenderIcon();

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<EditHouseSchemaType>();

  const handleUpdateHouse = async (values: EditHouseSchemaType) => {
    await API.FALL_SURVEILANCE.patch(
      values,
      API_PATH.HOUSE_SERVICES.HOUSE_DETAIL(data?.id as string),
    ).json<BaseResponse<CreateRoomResponse>>(r => r);
  };

  const onSubmit = handleSubmit(async (values: EditHouseSchemaType) => {
    setIsloading(true);
    try {
      await handleUpdateHouse(values);
      mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);
    } catch (e) {
      console.log(e);
    } finally {
      setIsloading(false);
      onClose();
    }
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('address', data.address);
    }
  }, [data, setValue]);

  return (
    <Modal visible={isOpen} onBackdropPress={onClose}>
      <Layout
        style={{
          width: 370,
          maxHeight: 380,
          elevation: 2,
          borderRadius: 8,
          overflow: 'hidden',
          padding: 0,
          backgroundColor: 'white',
        }}
        level="3">
        <View style={styles.formContainer}>
          <Text category="h6" style={{textAlign: 'center', marginBottom: 8}}>
            Edit House Info
          </Text>
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
                  placeholder="Description"
                  onBlur={onBlur}
                  onChangeText={val => onChange(val)}
                  value={value}
                />
              )}
              name="description"
            />
            {errors.description && (
              <Text category="s2" status="danger" style={{marginTop: 5}}>
                {errors.description.message}
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
                  accessoryLeft={renderIcon('info-outline')}
                  size="large"
                  placeholder="Adress"
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

          <Button
            disabled={isLoading}
            style={{
              marginTop: 10,
            }}
            onPress={() => onSubmit()}>
            Save
          </Button>
        </View>
      </Layout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 25,
    paddingVertical: 35,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
});
