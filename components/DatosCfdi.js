import React from "react";
import {
  View,
  ImagePropTypes,
  StyleSheet,
  TextInputComponent,
} from "react-native";
import { Input, Text } from "react-native-elements";

const DatosCfdi = (props) => {
  return (
    <View>
      <View>
        <Text>Qr Text</Text>
        <Input value={props.qr} />
      </View>

      <View>
        <Text>Resultado</Text>
        <Input value={props.resultado} />
      </View>
      <View>
        <Text>UUID</Text>
        <Input Text="UUID" placeholder="UUID" value={props.uuid} />
      </View>
      <View>
        <Text>Total</Text>
        <Input placeholder="Total" value={props.total} />
      </View>
    </View>
  );
};

export default DatosCfdi;

const style = StyleSheet.create({});
