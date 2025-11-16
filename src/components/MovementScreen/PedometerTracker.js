import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import {saveDailyData, getDailyData } from "../../utils/Database";

const PEDOMETER_TASK = "pedometer-background-task";
const STEP_GOAL = 10000; // Customizable
const DISTANCE_GOAL = 5; // km, customizable

TaskManager.defineTask(PEDOMETER_TASK, async () => {
  const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const { steps } = await Pedometer.getStepCountAsync(
    new Date(now),
    new Date()
  );

  // For distance, estimate if no GPS: assume average stride 0.762m
  const estimatedDistance = steps * 0.000762; // km
  saveDailyData(now, steps, estimatedDistance);
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export default function PedometerTracker({ onProgressUpdate }) {
  const [isAvailable, setIsAvailable] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const setup = async () => {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);
      if (available) {
        const permission = await Pedometer.requestPermissionsAsync();
        if (permission.granted) {
          const sub = Pedometer.watchStepCount((result) => {
            setSteps((prev) => prev + result.steps);
            setDistance((prev) => prev + result.steps * 0.000762); // Real-time estimate
            onProgressUpdate({
              steps: prev + result.steps,
              distance: prev + result.steps * 0.000762,
            });
          });

          // Background registration
          await BackgroundFetch.registerTaskAsync(PEDOMETER_TASK, {
            minimumInterval: 60 * 15, // 15 mins, battery optimized
            stopOnTerminate: false,
            startOnBoot: true,
          });

          return () => sub.remove();
        }
      }
    };
    setup();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    getDailyData(today, (data) => {
      setSteps(data.steps);
      setDistance(data.distance);
    });
  }, []);

  if (!isAvailable) return <Text>Pedometer not available on this device.</Text>;

  const progress = Math.min((steps / STEP_GOAL) * 100, 100); // For ring

  return null; // Invisible component, just tracks
}
