import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Separator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Link href="/screens/CameraScreen" asChild>
        <Button title="Camera" />
      </Link>
      <Separator />

      <Link href="/screens/PictureGalleryScreen" asChild>
        <Button title="Picture Gallery" />
      </Link>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
