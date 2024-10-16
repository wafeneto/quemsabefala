import React, { useEffect, useState } from 'react';
 import {  Button,  TextInput, StyleSheet, SafeAreaView, FlatList, Text, View, Pressable } from 'react-native';
 import SelectDropdown from 'react-native-select-dropdown'

 import RNPickerSelect from 'react-native-picker-select';
import { Kodefy } from './lib.js';
 

 

 
var sentenca = ""
 function setaTexto(valor){
  
  sentenca = valor
 }
 export default App = () => {


  var colaborador = Kodefy.colaborador
  

  async function   inserePergunta(){
    var pergunta = new Object();
    pergunta.codigo = 0;
    pergunta.sentenca = sentenca;
    pergunta.assunto = new Object()
    pergunta.assunto.codigo = assunto;
    pergunta.colaborador = new Object()
    pergunta.colaborador.codigo = colaborador.codigo

    var retorno = Kodefy.runUrl('https://quemsabefala.conectasuas.com.br/mentorMw/rodaTransacao',"transacaoMentor=397&moduloMentor=mw&objPergunta="+JSON.stringify(pergunta))

    /*
   var retorno = await fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaTransacao', {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' // <-- Specifying the Content-Type
}),
body: "transacaoMentor=397&moduloMentor=mw&objPergunta=" + JSON.stringify(pergunta)
});
*/

    alert("jjj aaa qui- " +  JSON.stringify(retorno))
  }

  var atualizando = false

  async function inicia(){

    
    useEffect(() => {

   
    
      fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?visaoMentor=669')
        .then((response) => response.json()) 
        .then((json) => 
        
    {for(var x = 0;x<json.length;x++){
     json[x].label = json[x].nome
     json[x].value = json[x].codigo
    }
        setAssuntos(json)
      }
        )
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));


    fetch('https://quemsabefala.conectasuas.com.br/mentorMw/rodaVisao?visaoMentor=667&varcodigo='+colaborador.codigo)
        .then((response) => response.json()) 
        .then((json2) => 
        
    {
      
      if(json2.perguntas != null)
        setPerguntas(json2.perguntas)
      }
        )
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));


    }, []); 
  }


   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);

   const [sentenca, setSentenca] = useState("");
   const [assunto, setAssunto] = useState("1");


   const [assuntos, setAssuntos] = useState([]);


   const [perguntas, setPerguntas] = useState([]);


   function seta(valor){
    setAssunto(valor)
   // alert("- voce selecionou " + valor + " - " + sentenca)
   }

   
   
function titulo(item){
  if(item.respostas == null)
    item.respostas = new Array()
  return "Respostas [" + item.respostas.length + "]"
}
  

  inicia()

   return (
 
     <View style={{ flex: 1, padding: 24 }}>
       {isLoading ? <Text>Loading...</Text> : 
       ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
           <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
       {assunto} {colaborador.nome} -{perguntas.length}-
            Dados do StackOverFlow:</Text>
           <FlatList
             data={perguntas}
             keyExtractor={(item, codigo) => codigo}
             renderItem={({ item }) => (  
                <View>
                <Text> Pergunta: 
       {item.sentenca}
                </Text>
                <View>
                <Button
        title={titulo(item)}
        onPress={() => alert(9)}
      />
                  </View>
                </View>
             )}


            
           />

<SafeAreaView>
<TextInput
        style={styles.input}
        onChangeText={setSentenca}
        value={sentenca}
      />

<RNPickerSelect
      onValueChange={(value) => seta(value)}
      items={assuntos}
              value = {2}


              pickerProps={{
                accessibilityLabel: "seleciona",
              }}
    />
     
     <Button
        title="Insere Pergunta ! "
        onPress={() => inserePergunta()}
      />


    </SafeAreaView>

       



         </View>
       )}
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
});