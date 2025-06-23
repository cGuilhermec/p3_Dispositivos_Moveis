import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";

interface WeatherCardProps {
  title: string;
  value: string;
  icon: string;
  cardColor?: string;
  onPress?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  value,
  icon,
  cardColor = "rgba(255, 255, 255, 0.9)",
  onPress,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: cardColor,
            transform: [{ scale: scaleValue }],
            opacity: fadeValue,
          },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.icon}>{icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 22,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 0,
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 36,
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#5a6a7a",
    marginBottom: 6,
    fontWeight: "500",
  },
  value: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2c3e50",
  },
});

export default WeatherCard;
