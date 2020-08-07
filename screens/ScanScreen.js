import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { Text } from "react-native-elements";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";
import qrParser from "../utilities/qrParser";
import { useIsFocused } from "@react-navigation/native";

import { BarCodeScanner, getPermissionsAsync } from "expo-barcode-scanner";

const ScanScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  const onScanned = ({ type, data }) => {
    setScanned(true);

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
  };


  React.useEffect(() => {
    getPermissionsAsync();
    setScanned(false);
    console.log("LOADED");
  }, [isFocused]);

  const requestPermisionView = (
    <View style={styles.message}>
      <Text h3>Solicitando permisos para la cámara...</Text>
    </View>
  );

  const deniedPermisionView = (
    <View style={styles.message}>
      <Text h3>No se autorizó el acceso a la camara.</Text>
    </View>
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
      {hasCameraPermission === true
        ? scannerView
        : hasCameraPermission == false
        ? deniedPermisionView
        : requestPermisionView}
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
  message: {
    padding: 20,
  },
});
