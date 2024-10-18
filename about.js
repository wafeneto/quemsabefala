import React, { useEffect, useState } from 'react';
import { document, title, SafeAreaView, View, FlatList, Button, Text, TextInput, StyleSheet } from 'react-native';



import { Kodefy } from './lib.js';

const AboutScreen = () => {
  const colaborador = Kodefy.colaborador;

  const [perguntas, setPerguntas] = useState([]);
 



  const fetchPerguntas = async () => {
    try {
      const response = await fetch(`https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?visaoMentor=668&varcodigo=${colaborador.codigo}`);
      const result = await response.json();
      if(result.perguntas == null)
        result.perguntas = new Array()
      const formattedPerguntas = result.perguntas.map((item, index) => ({
        ...item,
        key: String(item.codigo), // Use um identificador único
      }));
      setPerguntas(formattedPerguntas);
    } catch (error) {
      console.error(error);
    }
  };

function showAnsw(){

}
 

  useEffect(() => {
    fetchPerguntas();
  }, []);

  function labelResposta(item){
    if(item.respostas == null)
      item.respostas = new Array()
    return "Respostas ["+item.respostas.length+"]"
  }
  return (
    <View>
      
      <Text>{colaborador.nome}</Text>

    
      <FlatList
        data={perguntas}
        extraData={perguntas}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View style={styles.label} >
            <Text  >Pergunta: {item.sentenca}</Text>
            <Text  >Assunto: {item.assunto.nome}</Text>
            <Button style={styles.button}
          title={labelResposta(item)}
          onPress={showAnsw}
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

export default AboutScreen;
