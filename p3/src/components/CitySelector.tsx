import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";

interface CitySelectorProps {
  cities: readonly string[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCity,
  onSelectCity,
}) => {
  const [animation] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get("window").width;

  const handlePress = (city: string) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => onSelectCity(city));
  };

  const scaleInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.95],
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={screenWidth * 0.4}
        decelerationRate="fast"
      >
        {cities.map((city) => (
          <TouchableOpacity
            key={city}
            onPress={() => handlePress(city)}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.cityButton,
                selectedCity === city && styles.selectedCityButton,
                {
                  transform: [
                    { scale: selectedCity === city ? scaleInterpolation : 1 },
                  ],
                  marginHorizontal: 6,
                },
              ]}
            >
              <Text
                style={[
                  styles.cityText,
                  selectedCity === city && styles.selectedCityText,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {city}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 15,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cityButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCityButton: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  cityText: {
    color: "#2c3e50",
    fontWeight: "500",
    fontSize: 14,
  },
  selectedCityText: {
    fontWeight: "700",
    color: "#2c3e50",
  },
});

export default CitySelector;
