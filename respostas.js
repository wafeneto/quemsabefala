import { StatusBar } from 'expo-status-bar';
import { Button,  FlatList, TextInput, StyleSheet, SafeAreaView, Text, View } from 'react-native';


import * as React from 'react';



import{Kodefy} from './lib'

import { useState } from 'react';


export default  function   Respostas({navigation}) {

  pergunta = Kodefy.pergunta

  const frespostas = pergunta.respostas.map((item, index) => ({
    ...item,
    key: String(index), // Use um identificador único
   
  }));
  

  const addItem = async () => {
    try {
      resposta = new Object()
      resposta.codigo = 0
      resposta.sentenca = sentenca

      pergunta.respostas.push(resposta)

      

     await Kodefy.runUrl('https://quemsabefala.conectasuas.com.br/mentorMw/rodaTransacao', `transacaoMentor=397&moduloMentor=mw&objPergunta=${JSON.stringify(pergunta)}`);
      setSentenca(''); // Limpa o campo de entrada
     Kodefy.pergunta = pergunta
    } catch (error) {
      alert(error);
    }
  };


  const [sentenca, setSentenca] = useState("");

  

  return (
    <View style={{ flex: 1, padding: 24 }}>
    <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
        <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
    {pergunta.sentenca}
    {pergunta.assunto.nome}
    {pergunta.colaborador.codigo}
    {sentenca}
</Text>

<View>

<FlatList
        data={frespostas}
        extraData={frespostas}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.label} >
            <Text  >Pergunta: {item.sentenca}</Text> 
            </View> )}
            />
            

</View>

</View>

<SafeAreaView>
        <Text>Texto da Resposta</Text>
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
