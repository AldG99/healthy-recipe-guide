import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const categories = [
    { id: 1, title: 'Pérdida de Peso', type: 'weightloss' },
    { id: 2, title: 'Ganancia Muscular', type: 'muscle' },
    { id: 3, title: 'Equilibrado', type: 'balanced' },
  ];

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: '#dcdcdc',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  settingsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#007BFF',
  },
});

export default HomeScreen;
