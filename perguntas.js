import React, { useEffect, useState , useCallback} from 'react';
import { document, title, SafeAreaView, View, FlatList, Button, Text, TextInput, StyleSheet } from 'react-native';


import { useFocusEffect } from '@react-navigation/native';

import { Kodefy } from './lib.js';

const PergScreen = ({navigation}) => {
  var colaborador = Kodefy.colaborador;

  const [perguntas, setPerguntas] = useState([]);
 
// apresenta perguntas passiveis do usuario logado responder



  const fetchPerguntas = async () => { // recuperar pergunta do servico web [diagrama Listagem de perguntas]
    try {
      const response = await fetch(`https://quemsabefala.uniconecta.com.br/mentorMw/rodaVisao?visaoMentor=668&varcodigo=` + Kodefy.colaborador.codigo);
      const result = await response.json();

      if(result == null)
        result = new Array()
      const formattedPerguntas = result.map((item, index) => ({
        ...item,
        key: String(item.codigo), // Use um identificador único
      }));
      setPerguntas(formattedPerguntas); // registra perguntas recuperadas no state
    } catch (error) {
      console.error(error);
    }
  };

function navegaResp(pergunta,index){

  Kodefy.pergunta = pergunta
  Kodefy.indPerg = (index)
  Kodefy.perguntas = perguntas

  // navega para tela de respostas registrando pergunta no servico
  navigation.navigate("respostas")
}

 

  useEffect(() => {
    // tratar carga inicial da tela
    fetchPerguntas();
  }, []);

  useFocusEffect(
    useCallback(() => {
     {
      
      colaborador = Kodefy.colaborador
    // tratar recarga de tela apos persistir novas respostas ou trocar usuario logado em telas auxiliares
      fetchPerguntas()
    }
    }, []))

  function labelResposta(item){
// tratamento dinamico do label do botao para detalhar respostas de uma pergunta apresentando ja o total de respostas cadastradasß
   

    if(item.respostas == null)
      item.respostas = new Array()
    return "Respostas ["+item.respostas.length+"]"
  }
  return (
    <View>
      
      <Text>{colaborador.nome} ss</Text>

    
      <FlatList
        data={perguntas}
        extraData={perguntas}
        keyExtractor={item => item.key}
        renderItem={({ item , index }) => (
          <View style={styles.label} >
            <Text  >Pergunta: {item.sentenca}</Text>
            <Text  >Assunto: {item.assunto.nome}</Text>
            <Button style={styles.button}
          title={labelResposta(item)}
          onPress={() => navegaResp(item,index)}
        />
          </View>
        )}/>


    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label:{
    fontSize: 20,
    fontStyle: 'normal',
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  button:{
    padding: 10,
    marginTop: 40,
    color: "red"
  }
});

export default PergScreen;
