import { useTranslation } from 'react-i18next';
import React, { FC, useRef, useEffect } from 'react';
import { CameraType, CameraView, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
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
import useC2PAPost from '@/src/hooks/AxiosHooks/useC2PAPost';
import crIcon from '@/src/assets/images/cr.png';
import LoadingComponent from '@/src/app/components/LoadingComponent';
import { UserData } from '@/src/types/types';
import InputManifestModal from '@/src/app/components/InputManifestModal';

enum CameraFacing {
  BACK = 'back',
  FRONT = 'front',
}

const CameraScreen: FC = () => {
  const { t } = useTranslation();
  const [facing, setFacing] = useState<CameraType>(CameraFacing.BACK);
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const cameraRef = useRef<CameraView>(null);
  const [isInputModalVisible, setInputModalVisible] = useState<boolean>(false);
  const { response, apiError, loading, postData } = useC2PAPost();

  //Effect to ask the user for Camera Permission
  useEffect(() => {
    if (!permission) {
      requestPermission().then(() => {});
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

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === CameraFacing.BACK ? CameraFacing.FRONT : CameraFacing.BACK,
    );
  };

  async function onTakePicturePressed() {
    const photo = await cameraRef.current?.takePictureAsync({ base64: true });
    if (photo) {
      setPhoto(photo);
      console.log(photo.uri);
    }
  }

  function onRetakeButtonPressed() {
    setPhoto(undefined);
  }

  async function callC2PAManifest() {
    if (photo?.base64) {
      await MediaLibrary.createAssetAsync(photo.uri);
      postData(photo.base64);
    }
  }

  const handleInputSave = (data: UserData) => {
    console.log('User Information:', data);
    if (data.fullName === '' || data.fullName === undefined) {
      Alert.alert('Invalid Input Data', 'Please at least provide the Full Name.', [
        { text: 'OK', onPress: () => setInputModalVisible(true), style: 'cancel' },
      ]);
      return;
    }
    callC2PAManifest().then(() => {});
  };

  const apiErrorAlert = () =>
    Alert.alert(t('apiErrorTitle'), t('APIErrorDescription'), [
      { text: 'OK', onPress: () => onRetakeButtonPressed() },
    ]);

  return (
    <View style={[STYLES.container, { alignItems: 'center' }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('camera'),
        }}
      />
      {loading ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <>
          {photo ? (
            <>
              <Image source={{ uri: photo.uri }} style={StyleSheet.absoluteFill} />
              {response ? (
                <>
                  {Alert.alert(t('SuccessUploadAlertMessage'))}
                  <Image source={crIcon} style={STYLES.cameraToggle} />
                </>
              ) : (
                <>
                  {apiError ? (
                    <>{apiErrorAlert()}</>
                  ) : (
                    <>
                      <InputManifestModal
                        visible={isInputModalVisible}
                        onClose={() => {
                          setInputModalVisible(false);
                        }}
                        onSave={handleInputSave}
                      />
                      <View style={STYLES.PhotoButtonContainer}>
                        {isInputModalVisible ? null : (
                          <>
                            <Pressable style={STYLES.PhotoButtons} onPress={onRetakeButtonPressed}>
                              <Text style={STYLES.photoText}>{t('retake')}</Text>
                            </Pressable>
                            <Pressable
                              style={STYLES.PhotoButtons}
                              onPress={() => {
                                setInputModalVisible(true);
                              }}>
                              <Text style={STYLES.photoText}>{t('sign')}</Text>
                            </Pressable>
                          </>
                        )}
                      </View>
                    </>
                  )}
                </>
              )}
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
        </>
      )}
    </View>
  );
};

export default CameraScreen;
