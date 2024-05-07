import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Screen</Text>
    </View>
  );
};

export default CameraScreen;

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
