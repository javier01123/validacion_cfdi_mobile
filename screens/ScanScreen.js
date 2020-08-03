import * as React from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";
import qrParser from "../utilities/qrParser";

import { BarCodeScanner, getPermissionsAsync } from "expo-barcode-scanner";

const ScanScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    let datosCfdi = qrParser(data);

    if (!datosCfdi.uuid) {
      Alert.alert("QR inválido, verifique que es un CFDI 3.3");
      return;
    }

    navigation.navigate("Resultado", { qrData: data });
  };

  React.useEffect(() => {
    getPermissionsAsync(), [];
  });

  //TODO:debo manejar cuando se negó el permiso

  const requestPermisionView = <Text>Cargando...</Text>;

  const scannerView = (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
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
