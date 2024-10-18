import { StatusBar } from 'expo-status-bar';
import { Button,  TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';


import * as React from 'react';



import{Kodefy} from './lib'

import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default  function   Login({navigation}) {

alert(navigation)

  async function flogin(navigation){
    alert("login" + navigation)

    var usu = await fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?mwExibeSql=true&visaoMentor=667&varmatricula=' + login + "&varsenha=" + senha)
    usu = await usu.json();

    if(usu == null){
      alert("usario nao encontrado")
    }else{
      Kodefy.colaborador = usu
      try {
        await AsyncStorage.setItem(
          'logedUser',
          JSON.stringify(usu),
        );
      } catch (error) {
        alert("Erro ao persistir usuario " + error)
        return
      }
     alert(Kodefy.colaborador)
      navigation.navigate("aba",{nome:"waldyr"})
    }

   


    //navigation.navigate("aba",{nome:"waldyr"})
  }

  const [login, setLogin] = useState("");

  const [senha, setSenha] = useState("");
  
  AsyncStorage.getItem("logedUser").then(a => {
    var usu = JSON.parse(a);
    Kodefy.colaborador = usu;
    navigation.navigate("aba",{nome:"waldyr"})

  })

  return (
    <View style={{ flex: 1, padding: 24 }}>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
inicio
</Text></View>


<SafeAreaView>
<TextInput
        style={styles.input}
        onChangeText={setLogin}
        value={login}
      />

<TextInput
        style={styles.input}
        onChangeText={setSenha}
        value={senha}
      />


     
     <Button
        title="Insere Pergunta ! "
        onPress={() => flogin(navigation)}
      />


    </SafeAreaView>

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
