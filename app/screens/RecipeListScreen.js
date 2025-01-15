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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar receta..."
        value={search}
        onChangeText={handleSearch}
      />
      <TextInput
        style={styles.input}
        placeholder="Máx calorías..."
        keyboardType="numeric"
        onChangeText={value => handleFilterChange(value, 'calories')}
        value={filter.calories ? filter.calories.toString() : ''}
      />
      <TextInput
        style={styles.input}
        placeholder="Máx tiempo (min)..."
        keyboardType="numeric"
        onChangeText={value => handleFilterChange(value, 'time')}
        value={filter.time ? filter.time.toString() : ''}
      />
      <Button title="Limpiar filtros" onPress={clearFilters} />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loading: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});

export default RecipeListScreen;
