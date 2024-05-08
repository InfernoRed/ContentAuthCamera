import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { ROUTES, STYLES } from '@/src/constants';
import backgroundImage from '@/src/assets/images/background.png';

const Separator = () => <View style={STYLES.separator} />;

const HomeScreen: FC = () => {
  const { t } = useTranslation();

  const handleCameraRollButtonPress = () => {};
  const handlePictureGalleryButtonPress = () => {};

  return (
    <View style={STYLES.container}>
      <ImageBackground source={backgroundImage} style={STYLES.image}>
        <Link href={ROUTES.CameraScreenRoute} asChild>
          <Pressable style={STYLES.button} onPress={handleCameraRollButtonPress}>
            <Text style={STYLES.text}>{t('cameraRoll')}</Text>
          </Pressable>
        </Link>

        <Separator />
        <Link href={ROUTES.PictureGalleryScreenRoute} asChild>
          <Pressable style={STYLES.button} onPress={handlePictureGalleryButtonPress}>
            <Text style={STYLES.text}>{t('pictureGallery')}</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
