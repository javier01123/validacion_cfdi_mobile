import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import wsValidacionSat from "../services/wsValidacionSat";

const ValidadorScreen = ({ navigation }) => {
  const handleShowScanner = () => {
    navigation.navigate("Scanner");
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title=" Escanear código QR"
        onPress={handleShowScanner}
        icon={<Icon name="camera" size={30} color="white" />}
      />
    </View>
  );
};

export default ValidadorScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
    flex: 1,
  },
  button: {},
});
