import {useNavigation} from '@react-navigation/native';
import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {API, API_PATH} from '~/constants/api';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useRenderIcon} from '~/hooks/useRenderIcon';
import {BaseResponse} from '~/schema/common';
import {RoomSchemaType} from '~/schema/form';
import {useHouseDetailContext} from '../HouseDetail';
import {Room} from '~/schema/api/house';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: Room;
}

export function RoomModal({isOpen, onClose, data}: RoomModalProps) {
  const [isLoading, setIsloading] = useState(false);
  const {user} = useAuthContext();
  const {renderIcon} = useRenderIcon();
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<RoomSchemaType>({});
  const onSubmit = handleSubmit(async (data: RoomSchemaType) => {
    try {
      // const {data: respData} = await API.FALL_SURVEILANCE.post(
      //   {...data, owner_ids: [user?.id], rooms: []},
      //   API_PATH.HOUSE_SERVICES.CREATE,
      // ).json<BaseResponse<any>>(r => r);
      // setHouseId(respData.id);
      // navigation.navigate('Main');
      // navigation.navigate('HouseDetail');
    } catch (e) {
      setIsloading(false);
      console.log(e);
    } finally {
      setIsloading(false);
    }
  });

  return (
    <Modal visible={isOpen} onBackdropPress={onClose}>
      <Layout
        style={{
          width: 380,
          maxHeight: 380,
          elevation: 3,
          borderRadius: 16,
          overflow: 'hidden',
        }}
        level="3">
        <View style={styles.formContainer}>
          <Text category="h5" style={{textAlign: 'center', marginBottom: 10}}>
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
            <Text>Add</Text>
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
