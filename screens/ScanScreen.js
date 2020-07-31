"use strict";

import React, { Component } from "react";
import { AppRegistry, Linking } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

export default class ScanScreen extends Component {
  onSuccess = (e) => {
    Linking.openURL(e.data).catch((err) =>
      console.error("An error occured", err)
    );
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />
    );
  }
}

// AppRegistry.registerComponent("default", () => ScanScreen);
