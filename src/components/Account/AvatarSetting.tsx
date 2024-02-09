import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from '../core/Icon';
import {Button} from '@ui-kitten/components';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {uploadImage} from '~/libs/cloudinary';
import {API, API_PATH} from '~/constants/api';
import {BaseResponse} from '~/schema/common';
import {useAuthContext} from '~/context/auth';

interface AvatarSettingProps {
  avatarUrl?: string;
}

export const AvatarSetting = ({avatarUrl = ''}: AvatarSettingProps) => {
  const {user, setUser} = useAuthContext();

  const handleOpenLibrary = async () => {
    if (!user) return;

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    const {assets} = await launchImageLibrary(options as ImageLibraryOptions);

    const data = await uploadImage(assets);

    if (data) {
      try {
        const resp = await API.FALL_SURVEILANCE.patch(
          {avatar: data.secure_url},
          API_PATH.USER_SERVICES.PROFILE(user.id as string),
        ).json<BaseResponse<{avatar: string}>>(r => r);
        setUser({...user, avatar: resp.data.avatar ?? user.avatar});
      } catch (error) {
        console.log({error});
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: avatarUrl}}
        width={150}
        height={150}
        style={{
          borderRadius: 100,
          objectFit: 'cover',
        }}
      />
      <Button onPress={handleOpenLibrary} style={styles.cameraButton}>
        <Icon name="camera-outline" size="large" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});
