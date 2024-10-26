import { StatusBar } from 'expo-status-bar';
import { Button,  TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';

import * as React from 'react';



import{Kodefy} from './lib'

import { useState } from 'react';


export default  function   ChangeLogin({navigation}) {
// trocar usuario logado


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
   

   
    var usu = await fetch('https://quemsabefala.uniconecta.com.br/mentorMw/rodaVisao?mwExibeSql=true&visaoMentor=667&varmatricula=' + login + "&varsenha=" + senha)
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
      navigation.goBack()
    }

   


    //navigation.navigate("aba",{nome:"waldyr"})
  }

  const [login, setLogin] = useState("");

  const [senha, setSenha] = useState("");
  

  return (
    <View style={{ flex: 1, padding: 24 }}>
   


<SafeAreaView>
<Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
Login
</Text>
<TextInput
        style={styles.input}
        onChangeText={setLogin}
        value={login}
      />
<Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
Senha
</Text>
<TextInput
        style={styles.input}
        onChangeText={setSenha}

        placeholder="Digite sua senha"
        secureTextEntry={true} // 

        value={senha}
      />


     
     <Button
        title="Troca o Usuario ! "
        onPress={() => flogin(navigation)}
      />


    </SafeAreaView>

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ffffff",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
