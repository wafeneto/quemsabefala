import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import HomeScreen from './home';
 import AboutScreen from './about';
 import ChangeLogin from './changeLogin'; 



import{Kodefy} from './lib'

import { useState } from 'react';

async function inicia(){
  
  var teste = await Kodefy.runServiceQueryMod(669,"")
  setAssuntos(teste)
  alert((teste))
}


const Tab = createBottomTabNavigator();

export default  function   Abas() {


  

  return (
    <Tab.Navigator>
    <Tab.Screen name='Home' component={HomeScreen} />
    <Tab.Screen name='About' component={AboutScreen} />
    <Tab.Screen name='Login' component={ChangeLogin} />
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
