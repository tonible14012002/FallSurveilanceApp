import {Button, Layout} from '@ui-kitten/components';
import {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, StyleSheet, View} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {AvatarSetting, InfoDetails} from '~/components/Account';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {API, API_PATH} from '~/constants/api';
import {useAuthContext} from '~/context/auth';
import {uploadImage} from '~/libs/cloudinary';
import {UpdateProfileResponse} from '~/schema/api/identity';
import {BaseResponse} from '~/schema/common';
import {UpdateProfileSchemaType} from '~/schema/form';

export default function Account() {
  const {user, setUser} = useAuthContext();
  const [updateAvatar, setUpdateAvatar] = useState<Asset | null>(null);
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: {errors, isSubmitting, defaultValues},
  } = useForm<UpdateProfileSchemaType>({
    values: {
      nickname: user?.nickname ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  });

  const onSubmit = async (values: UpdateProfileSchemaType) => {
    try {
      let data: UpdateProfileSchemaType & {avatar?: string} = values;
      if (updateAvatar) {
        const uploadedImage = await uploadImage(updateAvatar);
        data = uploadedImage
          ? {...data, avatar: uploadedImage.secure_url}
          : data;
      }

      const resp = await API.FALL_SURVEILANCE.patch(
        data,
        API_PATH.USER_SERVICES.PROFILE(user?.id as string),
      ).json<BaseResponse<UpdateProfileResponse>>(r => r);
      setUser(resp.data);
      Alert.alert('Profile Updated!');
    } catch (e) {
      console.log({e});
    } finally {
      setUpdateAvatar(null);
    }
  };

  const handleResetValues = () => {
    reset();
    setUpdateAvatar(null);
  };

  const isInfoChanged = useMemo(
    () =>
      JSON.stringify(watch()) !== JSON.stringify(defaultValues) || updateAvatar,
    [watch(), updateAvatar],
  );

  return (
    <ScreenLayout hasPadding isScrollable topBar={<TopBar title="Account" />}>
      <Layout style={styles.wrapper}>
        <AvatarSetting
          avatar={user?.avatar}
          updateAvatar={updateAvatar}
          disabled={isSubmitting}
          setUpdateAvatar={setUpdateAvatar}
        />
        <InfoDetails control={control} errors={errors} />
        <View style={styles.actions}>
          <Button
            disabled={!isInfoChanged || isSubmitting}
            style={{
              marginTop: 10,
            }}
            size="large"
            status="danger"
            onPress={handleResetValues}>
            Reset
          </Button>
          <Button
            disabled={!isInfoChanged || isSubmitting}
            style={{
              marginTop: 10,
            }}
            size="large"
            onPress={handleSubmit(onSubmit)}>
            Save
          </Button>
        </View>
      </Layout>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
});
