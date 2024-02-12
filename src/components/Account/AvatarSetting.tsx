import {Button} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icon from '../core/Icon';

interface AvatarSettingProps {
  avatar?: string;
  updateAvatar: Asset | null;
  disabled: boolean;
  setUpdateAvatar: (asset: Asset) => void;
}

export const AvatarSetting = ({
  avatar = '',
  updateAvatar,
  disabled,
  setUpdateAvatar,
}: AvatarSettingProps) => {
  const handleOpenLibrary = async () => {
    if (disabled) return;

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    try {
      const {assets} = await launchImageLibrary(options as ImageLibraryOptions);

      if (assets && assets[0]) {
        setUpdateAvatar(assets[0]);
      }
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <TouchableOpacity onPress={handleOpenLibrary} style={styles.container}>
      <Image
        source={{uri: updateAvatar ? updateAvatar.uri : avatar}}
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
    </TouchableOpacity>
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
