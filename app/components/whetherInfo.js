import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import colors from "../config/colors";

function WhetherInfo({ currentWhether }) {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWhether;
  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.whetherInfo}>
      <Text style={{ color: colors.textDark }}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  whetherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: "capitalize",
    color: colors.textDark,
  },
  textPrimary: {
    fontSize: 40,
    color: colors.primary,
  },
  textSecondary: {
    fontSize: 20,
    color: colors.secondaryDark,
    fontWeight: "500",
    marginTop: 10,
  },
});

export default WhetherInfo;
