import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import RecipeListScreen from './app/screens/RecipeListScreen';
import RecipeDetailScreen from './app/screens/RecipeDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#FFE0B2' }, // Color de fondo cálido
          headerTintColor: '#4E342E', // Marrón oscuro para texto y botones
          headerTitleStyle: { fontWeight: 'bold' }, // Negrita para el título
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Recetas Saludables' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Configuraciones' }}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={({ route }) => {
            const category = route.params?.category;
            let title = 'Lista de Recetas';
            if (category === 'weightloss') title = 'Pérdida de Peso';
            if (category === 'muscle') title = 'Ganancia Muscular';
            if (category === 'balanced') title = 'Recetas Equilibradas';
            return { title };
          }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
          options={{ title: 'Detalles de la Receta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
