import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { recipeData } from '../data/recipes';

const RecipeListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const recipes = recipeData.filter(recipe => recipe.category === category);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ calories: null, time: null });
  const [loading, setLoading] = useState(false);

  const handleSearch = searchTerm => {
    setSearch(searchTerm);
  };

  const handleFilterChange = (value, type) => {
    if (value === '') {
      setFilter(prevState => ({ ...prevState, [type]: null }));
    } else {
      setFilter(prevState => ({
        ...prevState,
        [type]: parseInt(value),
      }));
    }
  };

  const filteredRecipes = recipes
    .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
    .filter(recipe =>
      filter.calories ? recipe.calories <= filter.calories : true
    )
    .filter(recipe => (filter.time ? recipe.time <= filter.time : true));

  const clearFilters = () => {
    setFilter({ calories: null, time: null });
    setSearch('');
  };

  if (loading) {
    return <Text style={styles.loading}>Cargando...</Text>;
  }

  return (
    <LinearGradient colors={['#FFECB3', '#FFE0B2']} style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar receta..."
        value={search}
        onChangeText={handleSearch}
        placeholderTextColor="#795548"
      />
      <TextInput
        style={styles.input}
        placeholder="Máx calorías..."
        keyboardType="numeric"
        onChangeText={value => handleFilterChange(value, 'calories')}
        value={filter.calories ? filter.calories.toString() : ''}
        placeholderTextColor="#795548"
      />
      <TextInput
        style={styles.input}
        placeholder="Máx tiempo (min)..."
        keyboardType="numeric"
        onChangeText={value => handleFilterChange(value, 'time')}
        value={filter.time ? filter.time.toString() : ''}
        placeholderTextColor="#795548"
      />
      <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
        <Text style={styles.clearButtonText}>Limpiar filtros</Text>
      </TouchableOpacity>

      {filteredRecipes.length === 0 ? (
        <Text style={styles.noResults}>No se encontraron recetas.</Text>
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() =>
                navigation.navigate('RecipeDetail', { recipe: item })
              }
            >
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeInfo}>
                Calorías: {item.calories} | Tiempo: {item.time} min
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: 'rgba(121, 85, 72, 0.5)', // Marrón suave
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 224, 178, 0.8)', // Tonalidad suave de melocotón
    color: '#4E342E', // Marrón oscuro
  },
  clearButton: {
    backgroundColor: 'rgba(255, 183, 77, 0.9)', // Tonalidad más brillante
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#4E342E',
    fontWeight: 'bold',
  },
  recipeCard: {
    backgroundColor: 'rgba(255, 224, 178, 0.8)', // Suave tonalidad de melocotón
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
  },
  recipeInfo: {
    fontSize: 14,
    color: '#6D4C41', // Marrón medio
    marginTop: 5,
  },
  loading: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4E342E',
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#795548',
    marginTop: 20,
  },
});

export default RecipeListScreen;
