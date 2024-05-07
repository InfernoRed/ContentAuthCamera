import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Separator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('@/src/assets/images/background.png')} style={styles.image}>
        <Link href="/screens/CameraScreen" asChild>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.text}>Camera Roll</Text>
          </Pressable>
        </Link>

        <Separator />
        <Link href="/screens/PictureGalleryScreen" asChild>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.text}>Picture Gallery</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: '20%',
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#b42025',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
