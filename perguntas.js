import React, { useEffect, useState , useCallback} from 'react';
import { document, title, SafeAreaView, View, FlatList, Button, Text, TextInput, StyleSheet } from 'react-native';


import { useFocusEffect } from '@react-navigation/native';

import { Kodefy } from './lib.js';

const PergScreen = ({navigation}) => {
  const colaborador = Kodefy.colaborador;

  const [perguntas, setPerguntas] = useState([]);
 



  const fetchPerguntas = async () => {
    try {
      console.log("pegando perguntas")
      const response = await fetch(`https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?visaoMentor=668&varcodigo=${colaborador.codigo}`);
      const result = await response.json();
      console.log(" perguntas -> " + result)
      if(result == null)
        result = new Array()
      const formattedPerguntas = result.map((item, index) => ({
        ...item,
        key: String(item.codigo), // Use um identificador único
      }));
      setPerguntas(formattedPerguntas);
    } catch (error) {
      console.error(error);
    }
  };

function navegaResp(pergunta,index){

  Kodefy.pergunta = pergunta
  Kodefy.indPerg = (index)
  Kodefy.perguntas = perguntas

  console.log(Kodefy.indPerg)
  navigation.navigate("respostas")
}

 

  useEffect(() => {
    fetchPerguntas();
  }, []);

  useFocusEffect(
    useCallback(() => {
     {
      console.log("use foculs")
fetchPerguntas()
    /*  var pergs = new Array();
      pergs = JSON.parse(JSON.stringify(Kodefy.perguntas))
      setPerguntas(pergs)
      console.log("passei pelo reload" + Kodefy.indPerg)
     }
    
    */
    }
    }, []))

  function labelResposta(item){
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
