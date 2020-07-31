import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DatosCfdi from "../components/DatosCfdi";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

const ValidadorScreen = (props) => {
  const [datosCfdi, setDatosCfdi] = useState();

  const onSuccess = (e) => {
    setDatosCfdi({ ...datosCfdi, qr: e.data });
  };

  return (
    <View>


      
      <Button
        title=" Escanear código QR"
        icon={<Icon name="camera" size={15} color="white" />}
      />
      {datosCfdi == null ? (
        <Text>En Espera de lectura</Text>
      ) : (
        <DatosCfdi {...datosCfdi} />
      )}
    </View>
  );
};

export default ValidadorScreen;
