import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

const CameraScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: t('camera'),
        }}
      />
      <Text style={styles.title}>{t('Camera Screen')}</Text>
    </View>
  );
};

export default CameraScreen;

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
