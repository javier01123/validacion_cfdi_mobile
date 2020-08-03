import React from "react";
import { Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  ImagePropTypes,
  StyleSheet,
  TextInputComponent,
} from "react-native";

const DatosCfdi = (props) => {
  let estadoIcon = (
    <Icon name="warning" size={20} style={{ marginLeft: 10 }} color="red" />
  );

  if (props.resultado.estado == "Vigente") {
    estadoIcon = (
      <Icon
        name="check-circle"
        size={20}
        style={{ marginLeft: 20 }}
        color="green"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={{ backgroundColor: "lightgreen" }}>Datos del CFDI</Text>

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

      <View style={styles.section}>
        <Text style={{ backgroundColor: "lightgreen" }}>
          Resultado de la validación
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Respuesta SAT</Text>
          <Text>{props.resultado.codigoEstatus} </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Estado</Text>
            <Text>
              {props.resultado.estado}
              {estadoIcon}
            </Text>
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
  section: {
    marginBottom: 20,
  },
});
