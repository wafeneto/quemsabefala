import { StatusBar } from 'expo-status-bar';
import {   StyleSheet, Text, View } from 'react-native';


import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import Icon from 'react-native-vector-icons/Ionicons'; // Exemplo usando Ionicons


 import HomeScreen from './home';
 import PergScreen from './perguntas';
 import ChangeLogin from './changeLogin'; 

 import { useEffect } from 'react';



import{Kodefy} from './lib'



const Tab = createBottomTabNavigator();

export default  function    Abas({navigation}) {

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Isso remove o botão "back"
    });
  }, [navigation]);

  // tela principal do sistema apresentando modulos no modelo de abas com icones
  
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'flag' : 'flag-outline';
        } else if (route.name === 'Perguntas') {
          iconName = focused ? 'flash' : 'flash-outline';
        }
        else if (route.name === 'Login') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    
    
    >
    <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Minhas Perguntas',headerLeft: () => null, }} />
    <Tab.Screen name='Perguntas' component={PergScreen} options={{ title: 'Perguntas Lancadas' }}  />
    <Tab.Screen name='Login' component={ChangeLogin} options={{ title: 'Trocar Usuario' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
