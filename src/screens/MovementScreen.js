import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StatsCard from "../components/MovementScreen/StatCard";
import CircleRing from "../components/MovementScreen/CircleRing";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// Dummy data
const goalData = {
  current: 700,
  target: 1000,
};
const stats = [
  { label: "Duration", value: "00:07", unit: "" },
  { label: "Distance", value: "0.00", unit: "km" },
  { label: "Pace", value: "--", unit: "/km" },
  { label: "Steps", value: "0", unit: "steps" },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

function MovementScreen() {
  const navigation = useNavigation();

  function runScreenNavigation() {
    navigation.navigate("RunScreen");
  }

  const handleCalendarPress = () => {
    // console.log("Navigate to Calendar View");
    // In a real app, you would use navigation here, e.g., navigation.navigate('Calendar');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          {/* Back Icon */}
          <FontAwesome5
            name="running"
            size={24}
            color="black"
            onPress={runScreenNavigation}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movement</Text>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={handleCalendarPress}
        >
          {/* Calendar Icon */}
          <Ionicons name="calendar" size={24} color="#3a3939ff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.daySelector}>
          {days.map((day, index) => (
            <TouchableOpacity
              key={day + index}
              style={[
                styles.dayBubble,
                day === "F" && styles.dayBubbleActive, // 'S' for Sunday is active
              ]}
            >
              <Text
                style={[styles.dayText, day === "F" && styles.dayTextActive]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <CircleRing current={goalData.current} target={goalData.target} />

        <View style={styles.statGrid}>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pauseButton}>
          <Text style={styles.pauseButtonText}>Pause</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MovementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#000", // Black background
    paddingTop: 50, // To avoid status bar
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerIcon: {
    padding: 5,
  },
  headerTitle: {
    color: "#111111ff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for the floating button
  },
  daySelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 350,
    marginBottom: 40,
  },
  dayBubble: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  dayBubbleActive: {
    backgroundColor: "#C535C5", // Purple color for active day
  },
  dayText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 12,
  },
  dayTextActive: {
    color: "#FFF",
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  pauseButton: {
    backgroundColor: "#333",
    borderRadius: 30,
    paddingVertical: 15,
    width: "100%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  pauseButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
