//import { useEffect } from "react";
//import { initDatabase } from "./src/utils/Database";
import { StatusBar } from "expo-status-bar";
import Root from "./src/nav/Root";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Root />
    </>
  );
}

{
  /* useEffect(() => {
    initDatabase();
  }, []);
  */
}

{
  /*
  
   function subscribe() {
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
    }
  
  
  */
}
