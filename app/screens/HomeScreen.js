import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: 1, title: 'Pérdida de Peso', type: 'weightloss' },
    { id: 2, title: 'Ganancia Muscular', type: 'muscle' },
    { id: 3, title: 'Equilibrado', type: 'balanced' },
  ];

  return (
    <LinearGradient colors={['#FFECB3', '#FFE0B2']} style={styles.container}>
      <Text style={styles.title}>Categorías de Recetas</Text>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryButton}
          onPress={() =>
            navigation.navigate('RecipeList', { category: category.type })
          }
        >
          <Text style={styles.categoryText}>{category.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Botón para la pantalla de configuraciones */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsText}>Configuraciones</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4E342E', // Marrón oscuro claro
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 204, 128, 0.8)', // Tonalidad suave de naranja
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryText: {
    fontSize: 18,
    color: '#4E342E', // Marrón oscuro claro para contraste
    textAlign: 'center',
    fontWeight: '500',
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 224, 178, 0.9)', // Suave tonalidad de melocotón
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  settingsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4E342E', // Marrón oscuro claro para contraste
    fontWeight: '500',
  },
});

export default HomeScreen;
