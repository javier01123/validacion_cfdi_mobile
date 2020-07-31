import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { BarCodeScanner, getPermissionsAsync } from "expo-barcode-scanner";

const ScanScreen = (props) => {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [scanned, setScanned] = React.useState();

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  React.useEffect(() => {
    getPermissionsAsync(), [];
  });

  const requestPermisionView = <Text>Requesting for camera permission</Text>;

  const scannerView = (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );

  return (
    <React.Fragment>
      {hasCameraPermission === false ? requestPermisionView : scannerView}
    </React.Fragment>
  );
};

export default ScanScreen;
