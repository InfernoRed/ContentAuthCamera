import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { STYLES } from '@/src/constants';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const PictureGalleryScreen: FC = () => {
  const { t } = useTranslation();

  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImageUri(result.assets[0].uri);
    }
  };

  function onSignedButtonPressed() {
    Alert.alert('TODO: Implementation with C2PA signing');
  }

  return (
    <View style={[STYLES.container, { alignItems: 'center' }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('pictureGallery'),
        }}
      />
      {selectedImageUri ? (
        <>
          <Image source={{ uri: selectedImageUri }} style={StyleSheet.absoluteFillObject} />
          <View style={STYLES.PhotoButtonContainer}>
            <Pressable style={STYLES.PhotoButtons} onPress={() => setSelectedImageUri(null)}>
              <Text style={STYLES.photoText}>{t('retake')}</Text>
            </Pressable>
            <Pressable style={STYLES.PhotoButtons} onPress={onSignedButtonPressed}>
              <Text style={STYLES.photoText}>{t('sign')}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Pressable style={[STYLES.button, { padding: 12 }]} onPress={pickImage}>
            <Text style={STYLES.text}>{t('imagePickerButtonLabel')}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default PictureGalleryScreen;
