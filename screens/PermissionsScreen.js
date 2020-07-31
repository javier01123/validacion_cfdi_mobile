import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import * as Permissions from "expo-permissions";

const PermissionsScreen = (props) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  async function alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== "granted") {
      alert("NO HAY PERMISOS PARA A CAMARA");
    } else {
      setPermissionGranted(true);
    }
  }

  useEffect(() => {
    alertIfRemoteNotificationsDisabledAsync();
  }, []);

  return (
    <View>
      {permissionGranted === true ? (
        <Text>Permitido</Text>
      ) : (
        <Text>Esperando confirmación.</Text>
      )}
    </View>
  );
};

export default PermissionsScreen;
