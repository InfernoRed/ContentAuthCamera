import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PictureGalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PictureGalleryScreen</Text>
    </View>
  );
};

export default PictureGalleryScreen;

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
});
