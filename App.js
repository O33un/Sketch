import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import CircularProgress from "react-native-circular-progress-indicator";
export default function App() {
  const [pedometerAvailability, setPedometerAvailability] = useState("");
  const [stepCount, updateStepCount] = useState(0);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    // function for the stepcount
    const subscription = Pedometer.watchStepCount((result) => {
      updateStepCount(result.steps); // steps is proivded by the pedometer package
    });
    // this checks if the pedometer is available
    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    ); // the result we get will be in a binary form (0 & 1) so we convert to string to get  false(0) or true(1)
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require("./assets/background.png")}
      >
        <View style={styles.textView}>
          <Text style={styles.text}>
            Is Pedometer Available on the device : {pedometerAvailability}
          </Text>
          <View style={styles.circularBar}>
            <CircularProgress
              value={stepCount}
              maxValue={6500}
              radius={90}
              duration={2000}
              activeStrokeColor={"#a1c2bd"}
              inActiveStrokeColor={"#ccc"}
              inActiveStrokeOpacity={0.5}
              activeStrokeWidth={15}
              inActiveStrokeWidth={15}
              title="STEPCOUNT"
              titleColor={"#faf9f9ff"}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>
          <View></View>
          <View>
            <Text style={styles.textDesign}> Target : 6500 steps (5kms)</Text>
          </View>

           <View>
            <Text style={styles.textDesign}> Distance Covered :65</Text>
          </View>

           <View>
            <Text style={styles.textDesign}> Calories Burnt :</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#Fff",
  },
  imageBackground: {
    flex: 1,
  },

  textView: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "black",
    backgroundColor: "rgba(226, 186, 241, 0.8)",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    //fontFamily: "papyrus",
  },
  stepCount: {
    color: "white",
  },
  textDesign:{
    backgroundColor: "rgba(155,89,182,0.5)",
    height:50,
    width:"80%",
    borderColor: "white",
    borderWidth:1,
    borderRadius:20,
    overflow:"hidden",
    fontSize:25,
    color:"white",
    fontWeight:"bold",
  },
  circularBar:{
    flex:3,
  },
});
