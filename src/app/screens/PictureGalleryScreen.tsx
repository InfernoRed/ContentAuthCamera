import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

const PictureGalleryScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('pictureGallery'),
        }}
      />
      <Text style={styles.title}>{t('pictureGalleryScreen')}</Text>
    </View>
  );
};

export default PictureGalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
