import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function WeatherDetails({ currentWeather, unitSystem }) {
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
  } = currentWeather;
  const windSpeed =
    unitSystem === "metric" ? `${speed} m/s` : `${speed} miles/h`;
  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailsBox,
            ...styles.weatherDetailsRow,
            borderRightWidth: 1,
            borderRightColor: colors.secondaryDark,
          }}
        >
          <FontAwesome5
            name="temperature-low"
            size={35}
            color={colors.primary}
          />
          <View style={styles.weatherDetailsItems}>
            <Text style={{ color: colors.textDark }}>Feels Like :</Text>
            <Text style={styles.textSecondary}>{feels_like} °</Text>
          </View>
        </View>

        <View style={[styles.weatherDetailsBox, styles.weatherDetailsRow]}>
          <FontAwesome5 name="water" size={40} color={colors.primary} />
          <View style={styles.weatherDetailsItems}>
            <Text style={{ color: colors.textDark }}>Humidity :</Text>
            <Text style={styles.textSecondary}>{humidity} %</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: colors.secondaryDark,
        }}
      >
        <View
          style={{
            ...styles.weatherDetailsBox,
            ...styles.weatherDetailsRow,
            borderRightWidth: 1,
            borderRightColor: colors.secondaryDark,
          }}
        >
          <MaterialCommunityIcons
            name="weather-windy"
            size={35}
            color={colors.primary}
          />
          <View style={styles.weatherDetailsItems}>
            <Text style={{ color: colors.textDark }}>Wind Speed :</Text>
            <Text style={styles.textSecondary}>{windSpeed}</Text>
          </View>
        </View>

        <View style={[styles.weatherDetailsBox, styles.weatherDetailsRow]}>
          <MaterialCommunityIcons
            name="speedometer"
            size={40}
            color={colors.primary}
          />
          <View style={styles.weatherDetailsItems}>
            <Text style={{ color: colors.textDark }}>Pressure :</Text>
            <Text style={styles.textSecondary}>{pressure}hPa</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: "auto",
    margin: 15,
    borderWidth: 1,
    borderColor: colors.secondaryDark,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
    alignContent: "center",
  },
  weatherDetailsItems: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  textSecondary: {
    fontSize: 20,
    color: colors.textDark,
    fontWeight: "bold",
    margin: 7,
  },
});

export default WeatherDetails;
