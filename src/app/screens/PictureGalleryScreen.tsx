import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { STYLES } from '@/src/constants';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useC2PAPost from '@/src/hooks/AxiosHooks/useC2PAPost';
import crIcon from '@/src/assets/images/cr.png';
import { ImagePickerAsset } from 'expo-image-picker';
import LoadingComponent from '@/src/app/components/LoadingComponent';

enum ImageTypes {
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
}

const PictureGalleryScreen: FC = () => {
  const { t } = useTranslation();
  const { response, apiError, loading, postData } = useC2PAPost();
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });
    if (result.canceled) return;

    console.log(result.assets[0].uri);

    if (checkFormat(result.assets[0].uri)) {
      setSelectedImage(result.assets[0]);
    } else {
      Alert.alert(t('UnsupportedFormatMessage'));
      return;
    }
  };

  function onSignedButtonPressed() {
    if (selectedImage?.base64) {
      postData(selectedImage.base64);
    } else {
      console.log('No Base64 enconding available.');
    }
  }

  function onRetakeButtonPressed() {
    setSelectedImage(null);
  }

  const apiErrorAlert = () =>
    Alert.alert(t('apiErrorTitle'), t('APIErrorDescription'), [
      { text: t('ok'), onPress: () => onRetakeButtonPressed() },
    ]);

  const checkFormat = (uri: string): boolean => {
    const parts = uri.split('.');
    const extension = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';

    return Object.values(ImageTypes).includes(extension as ImageTypes);
  };

  const BottomButtonsComponent = () => {
    return (
      <View style={STYLES.PhotoButtonContainer}>
        <Pressable style={STYLES.PhotoButtons} onPress={onRetakeButtonPressed}>
          <Text style={STYLES.photoText}>{t('retake')}</Text>
        </Pressable>
        <Pressable style={STYLES.PhotoButtons} onPress={onSignedButtonPressed}>
          <Text style={STYLES.photoText}>{t('sign')}</Text>
        </Pressable>
      </View>
    );
  };

  const ResponseViewComponent = () => {
    return (
      <>
        {Alert.alert(t('SuccessUploadAlertMessage'))}
        <Image source={crIcon} style={STYLES.cameraToggle} />
      </>
    );
  };

  return (
    <View style={[STYLES.container, { alignItems: 'center' }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('pictureGallery'),
        }}
      />
      {loading ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage.uri }} style={StyleSheet.absoluteFill} />
              {response ? (
                <ResponseViewComponent />
              ) : (
                <>{apiError ? <>{apiErrorAlert()}</> : <BottomButtonsComponent />}</>
              )}
            </>
          ) : (
            <>
              <Pressable style={[STYLES.button, { padding: 12 }]} onPress={pickImage}>
                <Text style={STYLES.text}>{t('imagePickerButtonLabel')}</Text>
              </Pressable>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PictureGalleryScreen;
