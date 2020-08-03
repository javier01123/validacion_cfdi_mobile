import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import wsValidacionSat from "../services/wsValidacionSat";

const ValidadorScreen = ({ navigation }) => {
  const handleShowScanner = () => {
    navigation.navigate("Scanner");
  };

  return (
    <View>
      <Button
        title=" Escanear código QR"
        onPress={handleShowScanner}
        icon={<Icon name="camera" size={15} color="white" />}
      />
    </View>
  );
};

export default ValidadorScreen;
