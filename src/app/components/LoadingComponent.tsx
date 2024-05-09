import { useTranslation } from 'react-i18next';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { STYLES } from '@/src/constants';

export default function LoadingComponent() {
  const { t } = useTranslation();
  return (
    <View style={STYLES.container}>
      <ActivityIndicator size="large" color="#b42025" />
      <Text>{t('loadingComponentLabel')}</Text>
    </View>
  );
}
