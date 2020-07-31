import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";

import { BarCodeScanner, getPermissionsAsync } from "expo-barcode-scanner";

const ScanScreen = (props) => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    //TODO: validar que es el formato de CFDI 3.3
    props.handleScanned(data);
  };

  React.useEffect(() => {
    getPermissionsAsync(), [];
  });

  //TODO:debo manejar cuando se negó el permiso

  const requestPermisionView = <Text>Solicitando permiso para la camara</Text>;

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
