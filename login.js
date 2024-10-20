import { StatusBar } from 'expo-status-bar';
import { Button,  TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';


import * as React from 'react';



import{Kodefy} from './lib'

import { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default  function   Login({navigation}) {

  async function flogin(navigation){

    if(login == ""){
      alert("Necessario informar um login!")
      return
    }

    if(senha == ""){
      alert("Necessario informar uma senha!")
      return
    }

    // servico do servidor para tentar recuperar usuario a partir do login e senha [diagrama login usuario]
   
    var usu = await fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?mwExibeSql=true&visaoMentor=667&varmatricula=' + login + "&varsenha=" + senha)
    usu = await usu.json();

    if(usu == null){
      // credenciais passadas nao conferem com usuarios cadastrados
      alert("usario nao encontrado")
    }else{

      // credenciais validas

      Kodefy.colaborador = usu // registra usuario no servico para comparttilhar com demais telas
      try {
        await AsyncStorage.setItem(
          'logedUser',
          JSON.stringify(usu),
        ); // persiste usuario logado para inibir necessidade de novo login no proximo acesso
      } catch (error) {
        alert("Erro ao persistir usuario " + error)
        return
      }
      navigation.navigate("quem sabe fala") // navega para tela com funcionalidades do sistema
    }

   


    //navigation.navigate("aba",{nome:"waldyr"})
  }

  const [login, setLogin] = useState("");

  const [senha, setSenha] = useState("");
  
  AsyncStorage.getItem("logedUser").then(a => {

    if(a == null){
      // tratamento do primeiro acesso sem usuario no storage
      return
    }
    var usu = JSON.parse(a);
    Kodefy.colaborador = usu // registra usuario no servvico para compartilhar com demais telas

    // recuperando usuario do storage e navegando para tela com funcionalidades do sistema
    navigation.navigate("quem sabe fala",{nome:"waldyr"})

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
