import { StatusBar } from 'expo-status-bar';
import { Button, br,  FlatList, TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';


import * as React from 'react';



import{Kodefy} from './lib'

import { useState } from 'react';


export default  function   Respostas({navigation}) {// recuperar pergunta do servico web [diagrama Listagem de perguntas]

  pergunta = Kodefy.pergunta // pegando pergunta do servico setado em tela anterior

  const frespostas = pergunta.respostas.map((item, index) => ({
    ...item,
    key: String(index), // Use um identificador único
   
  }));
  

  const addItem = async () => { // persistir resposta de uma pergunta [diagrama manter pergunta com respostas]
    try {
      resposta = new Object()
      resposta.codigo = 0
      resposta.sentenca = sentenca

      pergunta.respostas.push(resposta)

      

     await Kodefy.runUrl('https://quemsabefala.uniconecta.com.br/mentorMw/rodaTransacao', `transacaoMentor=397&moduloMentor=mw&objPergunta=${JSON.stringify(pergunta)}`);
      await alert("Resposta salvaa com sucesso.")
      navigation.goBack()
     Kodefy.pergunta = pergunta
    } catch (error) {
      alert(error);
    }
  };


  const [sentenca, setSentenca] = useState("");

  

  return (
    <View style={{ flex: 1, padding: 24 }}>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center'}}>
    Pergunta: {pergunta.sentenca}
    {"\n"}
    Assunto: {pergunta.assunto.nome}
    {sentenca}
</Text>

<View>

<FlatList
        data={frespostas}
        extraData={frespostas}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => (
          <View style={styles.label} >
            <Text  >resposta[{index + 1}]: {item.sentenca}</Text> 
            </View> )}
            />
            

</View>

</View>

<SafeAreaView>
        <Text 
        style = {{ fontSize: 20, color: 'green', textAlign: 'center', paddingTop: 10}}
        >Texto para resposta</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSentenca}
          value={sentenca}
          label={ 'Resposta'}
        />


    
        <Button
          title="Insere Resposta!"
          onPress={addItem}
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
