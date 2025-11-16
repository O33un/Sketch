import { View, Text, StyleSheet, Dimensions } from "react-native";

// Get screen width to calculate the card size dynamically
const screenWidth = Dimensions.get("window").width;
// Card width is roughly (ScreenWidth - padding*2 - margin*2) / 2
const CARD_SIZE = (screenWidth - 40 - 10) / 2;

function StatsCard({ label, value, unit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.valueText}>
        {value}
        <Text style={styles.unitText}>{unit}</Text>
      </Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

export default StatsCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE * 0.7, // Adjust height as needed
    backgroundColor: "#222", // Dark grey background
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  valueText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },
  unitText: {
    color: "#AAA",
    fontSize: 18,
    fontWeight: "400",
  },
  labelText: {
    color: "#AAA",
    fontSize: 14,
    fontWeight: "600",
  },
});
