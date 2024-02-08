import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from '../core/Icon';
import {Button} from '@ui-kitten/components';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

interface AvatarSettingProps {
  avatarUrl?: string;
}

export const AvatarSetting = ({avatarUrl = ''}: AvatarSettingProps) => {
  const handleOpenLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    const result = await launchImageLibrary(options as ImageLibraryOptions);
    console.log({result});
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
