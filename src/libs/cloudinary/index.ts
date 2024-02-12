import {CLOUDINARY_API_URL} from '@env';
import {Asset} from 'react-native-image-picker';

const uploadImage = async (asset: Asset) => {
  if (!asset) return null;

  const formData = new FormData();
  formData.append('file', {
    uri: asset.uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
  formData.append('upload_preset', 'fallsurveillanceapp');

  try {
    const response = await fetch(CLOUDINARY_API_URL, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  } catch (error) {
    console.log('Upload error');
  }
};

export {uploadImage};
