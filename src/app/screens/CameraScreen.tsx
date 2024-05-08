import { Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { STYLES } from '@/src/constants';

const CameraScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={[STYLES.container, { alignItems: 'center' }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('camera'),
        }}
      />
      <Text style={STYLES.title}>{t('cameraScreen')}</Text>
    </View>
  );
};

export default CameraScreen;
