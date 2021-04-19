import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-community/picker";
import colors from "../config/colors";

function UnitPicker({ unitSystem, setUnitSystem }) {
  return (
    <View style={styles.unitSystem}>
      <Picker
        selectedValue={unitSystem}
        onValueChange={(item) => setUnitSystem(item)}
        mode="dropdown"
        itemStyle={styles.item}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  unitSystem: {
    position: "absolute",
    height: 50,
    width: 100,
    ...Platform.select({
      ios: {
        top: "-45%",
      },
      android: {
        top: "-45%",
      },
    }),
    left: 10,
  },
  item: {
    fontSize: 15,
  },
});

export default UnitPicker;
