import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar as statusbarapi,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";

import colors from "./app/config/colors";
import dummy from "./app/config/data";
import WhetherInfo from "./app/components/whetherInfo";
import UnitPicker from "./app/components/UnitPicker";
import WeatherDetails from "./app/components/WeatherDetails";

const WHETHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
const BASE_WHETHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export default function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentWhether, setCurrentWhether] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    alert("Swipe Down To Refresh");
    load();
  }, []);

  useEffect(() => {
    load();
    //setCurrentWhether(dummy);
  }, [unitSystem]);

  async function load() {
    setCurrentWhether(null);
    setErrorMessage("");
    try {
      /// Ask for permission to access location
      let { status } = await Location.requestPermissionsAsync();
      /// Checking if permission is granted or not
      /// If not them them set an error message
      if (status !== "granted") {
        setErrorMessage("Location Access Denied!!");
        throw "Location access denied";
      }
      /// Fetch users current location
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const whetherUrl = `${BASE_WHETHER_URL}?lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WHETHER_API_KEY}`;

      const response = await fetch(whetherUrl);
      const jsonResponse = await response.json();
      if (response.ok) {
        setCurrentWhether(jsonResponse);
      } else {
        setErrorMessage(jsonResponse.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  let handleRefresh = () => {
    setRefreshing(true);
    load();
    setRefreshing(false);
  };

  if (currentWhether) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={colors.secondaryLight}
          barStyle={"default"}
        />

        <ScrollView
          centerContent={true}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
            />
          }
        >
          <View style={styles.main}>
            <UnitPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
            <WhetherInfo currentWhether={currentWhether} />
          </View>
        </ScrollView>
        <WeatherDetails
          currentWeather={currentWhether}
          unitSystem={unitSystem}
        />
      </SafeAreaView>
    );
  } else if (errorMessage) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={colors.secondaryLight}
          barStyle={"default"}
        />
        <ScrollView
          centerContent={true}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <Text style={{ alignSelf: "center", justifyContent: "center" }}>
            {errorMessage}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={colors.secondaryLight}
          barStyle={"default"}
        />
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? statusbarapi.currentHeight : 0,
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
  contentContainer: {
    paddingVertical: "30%",
  },
  unitpickercontainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
