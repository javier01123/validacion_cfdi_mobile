import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import DatosCfdi from "../components/DatosCfdi";
import wsValidacionSat from "../services/wsValidacionSat";
import qrParser from "../utilities/qrParser";

const ResultadoScreen = ({ route, navigation }) => {
  const [cfdiData, setCfdiData] = useState({});
  const [resultadoValidacion, setResultadoValidacion] = useState({
    codigoEstatus: "Validando CFDI...",
  });
  const { qrData } = route.params;

  const load = () => {
    setCfdiData(qrParser(qrData));

    wsValidacionSat
      .validate(qrData)
      .then((result) => {
        setResultadoValidacion(result);
      })
      .catch((err) => {
        console.log(err);
        alert("error, intente de nuevo");
      });
  };

  useEffect(() => load(), []);

  return (
    <View>
      <DatosCfdi {...cfdiData} resultado={resultadoValidacion} />
    </View>
  );
};

export default ResultadoScreen;
