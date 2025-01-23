import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  // Definición de las categorías de recetas que se mostrarán en la pantalla principal
  const categories = [
    { id: 1, title: 'Pérdida de Peso', type: 'weightloss' },
    { id: 2, title: 'Ganancia Muscular', type: 'muscle' },
    { id: 3, title: 'Equilibrado', type: 'balanced' },
  ];

  return (
    // Contenedor principal con un fondo degradado usando LinearGradient de Expo
    <LinearGradient colors={['#FFECB3', '#FFE0B2']} style={styles.container}>
      {/* Título de la sección de categorías */}
      <Text style={styles.title}>Categorías de Recetas</Text>

      {/* Mapeo de las categorías para mostrar un botón por cada una */}
      {categories.map(category => (
        <TouchableOpacity
          key={category.id} // Clave única para cada categoría
          style={styles.categoryButton} // Estilo del botón de categoría
          onPress={() =>
            // Navegar a la lista de recetas según la categoría seleccionada
            navigation.navigate('RecipeList', { category: category.type })
          }
        >
          {/* Texto dentro del botón que muestra el título de la categoría */}
          <Text style={styles.categoryText}>{category.title}</Text>
        </TouchableOpacity>
      ))}

      {/* Botón para ir a la pantalla de configuraciones */}
      <TouchableOpacity
        style={styles.settingsButton} // Estilo del botón de configuración
        onPress={() => navigation.navigate('Settings')} // Navegación a la pantalla de ajustes
      >
        {/* Texto del botón de configuración */}
        <Text style={styles.settingsText}>Configuraciones</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

// Estilos utilizando StyleSheet para mantener el código limpio y modular
const styles = StyleSheet.create({
  container: {
    flex: 1, // Toma todo el espacio disponible
    padding: 20, // Espaciado alrededor del contenido
  },
  title: {
    fontSize: 26, // Tamaño del texto
    fontWeight: 'bold', // Peso de la fuente para un título destacado
    color: '#4E342E', // Color marrón oscuro para el título
    marginBottom: 20, // Espaciado debajo del título
    textAlign: 'center', // Centrar el título
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 204, 128, 0.8)', // Color suave de naranja para el fondo del botón
    padding: 15, // Espaciado interno del botón
    borderRadius: 10, // Bordes redondeados para el botón
    marginBottom: 15, // Espaciado entre los botones
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
    shadowOpacity: 0.2, // Transparencia de la sombra
    shadowRadius: 4, // Difusión de la sombra
    elevation: 5, // Elevación para dar un efecto de profundidad (solo en Android)
  },
  categoryText: {
    fontSize: 18, // Tamaño del texto de las categorías
    color: '#4E342E', // Color de texto en marrón oscuro
    textAlign: 'center', // Centrado del texto
    fontWeight: '500', // Peso del texto para destacar sin ser tan pesado como el título
  },
  settingsButton: {
    backgroundColor: 'rgba(255, 224, 178, 0.9)', // Color suave de melocotón para el fondo del botón de configuración
    padding: 15, // Espaciado interno
    borderRadius: 10, // Bordes redondeados
    marginTop: 20, // Margen superior para separarlo de las categorías
    shadowColor: '#000', // Sombra para el botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Elevación para Android
  },
  settingsText: {
    fontSize: 18, // Tamaño del texto
    textAlign: 'center', // Centrado del texto
    color: '#4E342E', // Color marrón oscuro
    fontWeight: '500', // Peso del texto
  },
});

export default HomeScreen;
