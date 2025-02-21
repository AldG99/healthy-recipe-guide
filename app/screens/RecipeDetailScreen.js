import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.id === recipe.id));
  };

  const toggleFavorite = async () => {
    const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(recipe);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      <TouchableOpacity onPress={toggleFavorite}>
        <Text
          style={{
            color: isFavorite
              ? 'rgba(255, 99, 71, 1)'
              : 'rgba(169, 169, 169, 1)',
            fontSize: 18,
          }}
        >
          {isFavorite ? '❤️ Favorito' : '🤍 Marcar como favorito'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Calorías: {recipe.calories}</Text>
        <Text style={styles.infoText}>Tiempo: {recipe.time} min</Text>
        <Text style={styles.infoText}>Dificultad: {recipe.difficulty}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            • {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preparación:</Text>
        {recipe.steps.map((step, index) => (
          <Text key={index} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgba(255, 253, 234, 1)', // Crema suave para el fondo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'rgba(93, 75, 58, 1)', // Color oscuro para el texto
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(245, 239, 200, 1)', // Beige suave para el contenedor
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: 'rgba(93, 75, 58, 1)', // Color oscuro para el texto
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgba(93, 75, 58, 1)', // Color oscuro para el texto
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
    color: 'rgba(93, 75, 58, 1)', // Color oscuro para el texto
  },
});

export default RecipeDetailScreen;
