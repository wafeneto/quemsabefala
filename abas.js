import { StatusBar } from 'expo-status-bar';
import {   StyleSheet, Text, View } from 'react-native';


import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import HomeScreen from './home';
 import AboutScreen from './about';
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

  
  return (
    <Tab.Navigator>
    <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Minhas Perguntas',  headerLeft: null}} />
    <Tab.Screen name='About' component={AboutScreen} options={{ title: 'Perguntas Lancadas' }}  />
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
