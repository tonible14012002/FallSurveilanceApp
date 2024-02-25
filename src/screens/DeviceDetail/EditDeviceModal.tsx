import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {mutate} from 'swr';
import {API, API_PATH} from '~/constants/api';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {BaseResponse} from '~/schema/common';
import {EditDeviceSchemaType} from '~/schema/form';

interface EditDeviceModalProps {
  isOpen: boolean;
  deviceId: string;
  name: string;
  roomId: string;
  onClose: () => void;
}

export function EditDeviceModal({
  isOpen,
  name,
  deviceId,
  roomId,
  onClose,
}: EditDeviceModalProps) {
  const [isLoading, setIsloading] = useState(false);
  const {renderIcon} = useRenderIcon();

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<EditDeviceSchemaType>();

  const handleUpdateHouse = async (values: EditDeviceSchemaType) => {
    await API.FALL_SURVEILANCE.patch(
      values,
      API_PATH.DEVICE_SERVICES.MODIFY_DEVICE({roomId, id: deviceId}),
    ).json<BaseResponse<any>>(r => r);
  };

  const onSubmit = handleSubmit(async (values: EditDeviceSchemaType) => {
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
    if (name) {
      setValue('name', name);
    }
  }, [name]);

  return (
    <Modal visible={isOpen} onBackdropPress={onClose}>
      <Layout
        style={{
          width: 370,
          maxHeight: 380,
          elevation: 3,
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'lightgray',
          padding: 0,
          backgroundColor: 'white',
        }}
        level="3">
        <View style={styles.formContainer}>
          <Text category="h5" style={{textAlign: 'center', marginBottom: 10}}>
            Edit Device
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
          <Button
            disabled={isLoading}
            style={{
              marginTop: 10,
            }}
            onPress={onSubmit}>
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
