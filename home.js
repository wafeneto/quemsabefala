import React, { useEffect, useState ,useCallback} from 'react';
import { document, title, SafeAreaView, View, FlatList, Button, Text, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useFocusEffect } from '@react-navigation/native';

import { Kodefy } from './lib.js';

const MyComponent = ({navigation}) => {
  var colaborador = Kodefy.colaborador;

  const [perguntas, setPerguntas] = useState([]);
  const [sentenca, setSentenca] = useState('');
  const [assuntos, setAssuntos] = useState([]);
  const [assunto, setAssunto] = useState(2); // Altere para estado

  const [mostraNovo, setMostraNovo] = useState(false);
  const [indPerg, setIndPerg] = useState(-1); // Altere para estado

  const seta = (valor) => {
    setAssunto(valor);
  };

  async function navegaResp(pergunta,index){

    Kodefy.pergunta = pergunta
    Kodefy.indPerg = (index)
    Kodefy.perguntas = perguntas

    console.log(Kodefy.indPerg)
    navigation.navigate("respostas")
  }

  const fetchAssuntos = async () => { // recuperar pergunta do servico web [diagrama Listagem de Assuntos]
    try {
      const response = await fetch('https://quemsabefala.uniconecta.com.br/mentorMw/rodaVisao?visaoMentor=669');
      const json = await response.json();
      const formattedAssuntos = json.map(item => ({
        label: item.nome,
        value: item.codigo,
      }));
      setAssuntos(formattedAssuntos);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPerguntas = async () => {  // recuperar pergunta do servico web [diagrama Listagem de perguntas]
    try {
      
      const response = await fetch(`https://quemsabefala.uniconecta.com.br/mentorMw/rodaVisao?visaoMentor=667&varcodigo=` + Kodefy.colaborador.codigo);
      const result = await response.json();
      if(result.perguntas == null)
        result.perguntas = new Array()
      const formattedPerguntas = result.perguntas.map((item, index) => ({
        ...item,
        key: String(item.codigo), // Use um identificador único
        colaborador: colaborador
      }));
      setPerguntas(formattedPerguntas);  // recuperar pergunta do servico web [diagrama Listagem de perguntas]
    } catch (error) {
      console.error(error);
    }
  };

  function novaPergunta(){
     // alterar visualisacao para modulo de inserir pergunta
    setMostraNovo(true)
  }

  const addItem = async () => {

    // inserir pergunta servico web [diagrama salvar pergunta]
    try {
      const pergunta = {
        codigo: 0,
        sentenca,
        assunto: { codigo: assunto },
        colaborador: { codigo: colaborador.codigo },
      };

      await Kodefy.runUrl('https://quemsabefala.uniconecta.com.br/mentorMw/rodaTransacao', `transacaoMentor=397&moduloMentor=mw&objPergunta=${JSON.stringify(pergunta)}`);
      setSentenca(''); // Limpa o campo de entrada
      fetchPerguntas(); // Atualiza a lista após a inserção
      setMostraNovo(false)
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    // tratar desenho inicial da tela carregando perguntas de um usuario atualmente logado e assuntos para popular modulo de nova pergunta
    fetchAssuntos(); // Busca dados quando o componente é montado
    fetchPerguntas();
  }, [navigation]);



  useFocusEffect(
    // tratar recarga de tela apos persistir novas respostas ou trocar usuario logado em telas auxiliares
    useCallback(() => {
     {
      colaborador = Kodefy.colaborador

      fetchPerguntas()
   
    }
    }, [])

  );

  function labelResposta(item){
    // tratamento dinamico do label do botao para detalhar respostas de uma pergunta apresentando ja o total de respostas cadastradasß
    if(item.respostas == null)
      item.respostas = new Array()
    return "Respostas ["+item.respostas.length+"]"
  }
  return (
    <View>
      
      <Text>{colaborador.nome}</Text>

      { ! mostraNovo && 
      <FlatList
        data={perguntas}
        extraData={perguntas}
        keyExtractor={item => item.key}
        renderItem={({ item ,index}) => (
          <View style={styles.label} >
            <Text  >Pergunta: {item.sentenca}</Text>
            <Button style={styles.button}
          title={labelResposta(item)}
          onPress={() => navegaResp(item,index)}
        />
          </View>
        )}/>
}


  { ! mostraNovo && 
<Button
          title="Nova Pergunta!"
          onPress={novaPergunta}
        />
}


      { mostraNovo && 
      <SafeAreaView>
        <Text>Texto da Pergunta</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSentenca}
          value={sentenca}
          label={ 'Email'}
        />

    
        <RNPickerSelect
          onValueChange={setAssunto}
          items={assuntos}
          value={assunto}
          pickerProps={{
            accessibilityLabel: "seleciona",
          }}
        />
        <Button
          title="Insere Pergunta!"
          onPress={addItem}
        />
      </SafeAreaView>
}
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

export default MyComponent;
