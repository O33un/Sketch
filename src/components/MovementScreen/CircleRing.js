import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
const RADIUS = 110; // The size of the circle.
const STROKE_WIDTH = 20; // The thickness of the ring.
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // The total length of the circle's outline
const CENTER = RADIUS + STROKE_WIDTH / 2; // The center point of the SVG viewbox (The exact center point.)

//This function takes two values: current (e.g., 700 calories) and target (e.g., 1000 calories).

function CircleRing({ current, target }) {
  const percentage = Math.min(current / target, 1); // Calculates progress as a decimal. 700÷1000=0.7 (or 70%). The Math.min(..., 1) part just makes sure the result is never more than 1.0 (or 100%)—you can't fill a circle more than once!	This gives us the portion of the circle that should be filled with color.
  const strokeDashoffset = CIRCUMFERENCE - percentage * CIRCUMFERENCE; // The trick to drawing the progress. This is the distance left to be drawn (the empty part).	This value is passed to the SVG element. When an SVG circle uses a strokeDashoffset, it effectively hides the line for that calculated distance, leaving the colored line visible for the rest of the distance (percentage * CIRCUMFERENCE).
  // Defs stands for Definitions. It's a special container where you store reusable graphics elements—like gradients, patterns, or markers—that you want to define now but use later.
  // Think of it as a paint palette. You mix your custom color (the gradient) and put it on the palette inside the <Defs> section. Later, when you draw the circle, you just tell the circle to "use the color from the palette named 'progressGradient'." The elements inside <Defs> are defined but not rendered on the screen by themselves.
  return (
    <View style={styles.ringContainer}>
      <Svg width={CENTER * 2} height={CENTER * 2}>
        <Defs>
          {/* The id="progressGradient" gives it a unique name so the circle can reference it later. and These coordinates define the direction of the gradient.	Starting at the top-left corner (0%, 0%) and ending at the bottom-right corner (100%, 100%), this creates a diagonal color blend across the ring. */}
          {/* Gradient Definition: Purple to Red */}
          <LinearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop offset="0%" stopColor="#C535C5" stopOpacity="1" />
            {/* This is the starting point of the gradient. At 0% of the gradient line, the color is Purple (#C535C5).	It defines the first color in the transition. */}
            <Stop offset="100%" stopColor="#FA4A6F" stopOpacity="1" />
            {/* Red/Pink */}
          </LinearGradient>
        </Defs>

        {/* Background Ring (Grey) */}
        <Circle
          stroke="#333"
          fill="none"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        {/* Progress Ring (Gradient) */}

        <Circle
          stroke="url(#progressGradient)" // Use the defined gradient
          fill="none"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // For the rounded progress ends
          transform={`rotate(-90, ${CENTER}, ${CENTER})`} // Start from the top
        />
      </Svg>
      <View style={styles.textOverlay}>
        <Text style={styles.calText}>
          {current.toLocaleString()}/
          <Text style={styles.targetText}>{target.toLocaleString()}</Text>
          <Text style={styles.calUnitText}> CAL</Text>
        </Text>
      </View>
    </View>
  ); // The primary function of toLocaleString() is to format a number (or date) according to the user's local language and formatting conventions.
  //In the fitness app context, its main job is to add the correct separators (like commas or periods) for large numbers, making them easier to read for anyone, anywhere.
}

export default CircleRing;

const styles = StyleSheet.create({
  ringContainer: {
    width: CENTER * 2,
    height: CENTER * 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  textOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  calText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },
  targetText: {
    color: "#AAA",
    fontWeight: "400",
  },
  calUnitText: {
    color: "#AAA",
    fontSize: 16,
    fontWeight: "400",
  },
});
