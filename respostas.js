import { StatusBar } from 'expo-status-bar';
import { Button,  TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';


import * as React from 'react';



import{Kodefy} from './lib'

import { useState } from 'react';


export default  function   Respostas({navigation}) {




  const [login, setLogin] = useState("");

  const [senha, setSenha] = useState("");
  

  return (
    <View style={{ flex: 1, padding: 24 }}>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
inicio
</Text></View>



</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
