import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import WeatherCard from "../components/WeatherCard";
import CitySelector from "../components/CitySelector";

interface WeatherData {
  [city: string]: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    conditionEmoji: string;
    bgColors: readonly [string, string, ...string[]];
  };
}

const HomeScreen: React.FC = () => {
  const cities = [
    "São Paulo",
    "Rio de Janeiro",
    "Salvador",
    "Belo Horizonte",
    "Curitiba",
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const weatherData: WeatherData = {
    "São Paulo": {
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      condition: "Parcialmente Nublado",
      conditionEmoji: "⛅",
      bgColors: ["#cfd9df", "#e2ebf0"],
    },
    "Rio de Janeiro": {
      temperature: 28,
      humidity: 70,
      windSpeed: 15,
      condition: "Ensolarado",
      conditionEmoji: "☀️",
      bgColors: ["#ffafbd", "#ffc3a0"],
    },
    Salvador: {
      temperature: 26,
      humidity: 80,
      windSpeed: 18,
      condition: "Chuvoso",
      conditionEmoji: "🌧️",
      bgColors: ["#a1c4fd", "#c2e9fb"],
    },
    "Belo Horizonte": {
      temperature: 20,
      humidity: 60,
      windSpeed: 10,
      condition: "Nublado",
      conditionEmoji: "☁️",
      bgColors: ["#bdc3c7", "#2c3e50"],
    },
    Curitiba: {
      temperature: 15,
      humidity: 75,
      windSpeed: 8,
      condition: "Neblina",
      conditionEmoji: "🌫️",
      bgColors: ["#d3cce3", "#e9e4f0"],
    },
  };

  const handleCityChange = (city: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedCity(city);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  const handleMoreInfo = () => {
    Linking.openURL("https://portal.inmet.gov.br/#previsaoT");
  };

  const currentWeather = weatherData[selectedCity];

  return (
    <LinearGradient colors={currentWeather.bgColors} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Tempo Agora</Text>
          <Text style={styles.subtitle}>Previsão do tempo em tempo real</Text>
        </View>

        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onSelectCity={handleCityChange}
        />

        <Animated.View style={{ opacity: fadeAnim }}>
          <WeatherCard
            title="Temperatura"
            value={`${currentWeather.temperature}°C`}
            icon="🌡️"
            cardColor="rgba(255, 255, 255, 0.7)"
          />
          <WeatherCard
            title="Umidade"
            value={`${currentWeather.humidity}%`}
            icon="💧"
            cardColor="rgba(255, 255, 255, 0.7)"
          />
          <WeatherCard
            title="Vento"
            value={`${currentWeather.windSpeed} km/h`}
            icon="🌬️"
            cardColor="rgba(255, 255, 255, 0.7)"
          />
          <WeatherCard
            title="Condição"
            value={`${currentWeather.condition} ${currentWeather.conditionEmoji}`}
            icon={currentWeather.conditionEmoji}
            cardColor="rgba(255, 255, 255, 0.7)"
          />
        </Animated.View>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={handleMoreInfo}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={["#4facfe", "#00f2fe"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Mais Informações</Text>
            <Text style={styles.buttonIcon}>🌤️</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2c3e50",
    marginBottom: 8,
    letterSpacing: 1,
    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
    opacity: 0.8,
  },
  infoButton: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 30,
    shadowColor: "#4facfe",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
  buttonIcon: {
    fontSize: 22,
  },
});

export default HomeScreen;
