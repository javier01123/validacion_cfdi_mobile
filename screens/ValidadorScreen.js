import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import DatosCfdi from "../components/DatosCfdi";
import ScanScreen from "./ScanScreen";
import wsValidacionSat from "../services/wsValidacionSat";

const ValidadorScreen = (props) => {
  const [datosCfdi, setDatosCfdi] = useState();
  const [showScanner, setShowScanner] = useState();
  const [resultado, setResultado] = useState();

  const handleScanned = (qrText) => {
    setDatosCfdi({ ...datosCfdi, qr: qrText });
    setShowScanner(false);
    wsValidacionSat.validate(qrText).then((response) => {
      setResultado(response);
      console.log("resutado set");
    });
  };

  const handleShowScanner = (qrText) => {
    setShowScanner(true);
  };

  const scanner = <ScanScreen handleScanned={handleScanned} />;

  const mainView = (
    <View>
      <Button
        title=" Escanear código QR"
        onPress={handleShowScanner}
        icon={<Icon name="camera" size={15} color="white" />}
      />
      {datosCfdi == null ? (
        <Text>En Espera de lectura</Text>
      ) : (
        <DatosCfdi {...datosCfdi} resultado={resultado} />
      )}
    </View>
  );

  return (
    <React.Fragment>{showScanner === true ? scanner : mainView}</React.Fragment>
  );
};

export default ValidadorScreen;
