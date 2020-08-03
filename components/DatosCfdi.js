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
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Emisor</Text>
            <Text>{props.rfcEmisor}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Receptor</Text>
            <Text>{props.rfcReceptor}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total</Text>
          <Text>{props.total}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>UUID</Text>
          <Text>{props.uuid}</Text>
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={styles.row}>
          <Text style={styles.label}>Respuesta SAT</Text>
          <Text>{props.resultado.codigoEstatus} </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Estado</Text>
            <Text>{props.resultado.estado}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Es Cancelable</Text>
            <Text>{props.resultado.esCancelable} </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Estatus Cancelación</Text>
          <Text>{props.resultado.estatusCancelacion} </Text>
        </View>
      </View>
    </View>
  );
};

export default DatosCfdi;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
});
