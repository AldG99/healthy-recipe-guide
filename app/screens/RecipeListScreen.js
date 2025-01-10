import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { recipeData } from '../data/recipes';

const RecipeListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const recipes = recipeData.filter(recipe => recipe.category === category);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ calories: null, time: null });

  const filteredRecipes = recipes
    .filter(recipe => recipe.title.toLowerCase().includes(search.toLowerCase()))
    .filter(recipe =>
      filter.calories ? recipe.calories <= filter.calories : true
    )
    .filter(recipe => (filter.time ? recipe.time <= filter.time : true));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar receta..."
        value={search}
        onChangeText={setSearch}
      />
      <TextInput
        style={styles.input}
        placeholder="Máx calorías..."
        keyboardType="numeric"
        onChangeText={value =>
          setFilter({ ...filter, calories: parseInt(value) })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Máx tiempo (min)..."
        keyboardType="numeric"
        onChangeText={value => setFilter({ ...filter, time: parseInt(value) })}
      />
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
});

export default RecipeListScreen;
