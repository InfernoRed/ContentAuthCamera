import { useTranslation } from 'react-i18next';
import React, { FC, useRef, useEffect } from 'react';
import { CameraType, CameraView, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { STYLES } from '@/src/constants';

const CameraScreen: FC = () => {
  const { t } = useTranslation();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const cameraRef = useRef<CameraView>(null);

  //Effect to ask the user for Camera Permission
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={STYLES.container}>
        <Text style={{ textAlign: 'center' }}>{t('cameraPermissionMessage')}</Text>
        <Button onPress={requestPermission} title={t('grantPermission')} />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function onTakePicturePressed() {
    const photo = await cameraRef.current?.takePictureAsync();
    setPhoto(photo);
    console.log(photo);
  }
  function onRetakeButtonPressed() {
    setPhoto(undefined);
  }

  function onSignedButtonPressed() {
    Alert.alert('TODO: Implementation with C2PA signing');
  }

  return (
    <View style={[STYLES.container, { alignItems: 'center' }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('camera'),
        }}
      />
      {photo ? (
        <>
          <Image source={{ uri: photo.uri }} style={StyleSheet.absoluteFill} />
          <View style={STYLES.PhotoButtonContainer}>
            <Pressable style={STYLES.PhotoButtons} onPress={onRetakeButtonPressed}>
              <Text style={STYLES.photoText}>{t('retake')}</Text>
            </Pressable>
            <Pressable style={STYLES.PhotoButtons} onPress={onSignedButtonPressed}>
              <Text style={STYLES.photoText}>{t('sign')}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={cameraRef} />
          <Ionicons
            name="camera-reverse"
            size={40}
            onPress={toggleCameraFacing}
            style={STYLES.cameraToggle}
          />
          <Pressable onPress={onTakePicturePressed} style={STYLES.cameraButton} />
        </>
      )}
    </View>
  );
};

export default CameraScreen;
