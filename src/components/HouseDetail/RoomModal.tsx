import {useNavigation} from '@react-navigation/native';
import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {mutate} from 'swr';
import {API, API_PATH} from '~/constants/api';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {CreateRoomResponse, Room} from '~/schema/api/house';
import {BaseResponse} from '~/schema/common';
import {RoomSchemaType} from '~/schema/form';

interface RoomModalProps {
  isOpen: boolean;
  data?: Room;
  houseId: string;
  onClose: () => void;
}

export function RoomModal({isOpen, houseId, data, onClose}: RoomModalProps) {
  const [isLoading, setIsloading] = useState(false);
  const {renderIcon} = useRenderIcon();
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();

  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<RoomSchemaType>();

  const handleAddRoom = async (values: RoomSchemaType) => {
    const {data} = await API.FALL_SURVEILANCE.post(
      values,
      API_PATH.HOUSE_SERVICES.CREATE_ROOM(houseId),
    ).json<BaseResponse<CreateRoomResponse>>(r => r);

    navigation.navigate('Main');
    navigation.navigate('RoomDetail', {roomId: data.id});
  };

  const handleUpdateRoom = async (values: RoomSchemaType) => {
    const roomId = data?.id;

    await API.FALL_SURVEILANCE.put(
      values,
      API_PATH.HOUSE_SERVICES.ROOM_DETAIL(roomId as string),
    ).json<BaseResponse<CreateRoomResponse>>(r => r);
  };

  const onSubmit = handleSubmit(async (values: RoomSchemaType) => {
    setIsloading(true);
    try {
      await (data ? handleUpdateRoom(values) : handleAddRoom(values));
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
            {data ? 'Edit Room' : 'Add Room'}
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
                  placeholder="Description"
                  onBlur={onBlur}
                  onChangeText={onChange}
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

          <Button
            disabled={isLoading}
            style={{
              marginTop: 10,
            }}
            onPress={() => onSubmit()}>
            <Text>{data ? 'Save' : 'Add'}</Text>
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
