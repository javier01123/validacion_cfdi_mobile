import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";
import qrParser from "../utilities/qrParser";

import { BarCodeScanner, getPermissionsAsync } from "expo-barcode-scanner";

const ScanScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  // const [handleBarCodeScanned, setHandleBarCodeScanned] = useState();
  const [scanned, setScanned] = useState(false);

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  const onScanned = ({ type, data }) => {
    setScanned(true);

    try {
      let datosCfdi = qrParser(data);

      if (!datosCfdi.uuid) {
        Alert.alert("QR", "QR inválido, verifique que es un CFDI 3.3", [
          {
            text: "OK",
            onPress: () => {
              setScanned(false);
            },
          },
        ]);
        return;
      }

      navigation.navigate("Resultado", { qrData: data });
    } finally {
      // setScanned(false);
    }
  };

  React.useEffect(() => getPermissionsAsync(), []);

  const requestPermisionView = (
    <Text>Solicitando permisos para la cámara...</Text>
  );

  const scannerView = (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );

  return (
    <React.Fragment>
      {hasCameraPermission === false ? requestPermisionView : scannerView}
    </React.Fragment>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
