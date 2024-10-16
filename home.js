import React, { useEffect, useState } from 'react';
 import {  Button,  TextInput, StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
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

    alert("jjj aaa qui- " +  retorno)
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
        setData(json)
        alert(json.length)
      setSentenca(json[2].nome)
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


   function seta(valor){
    setAssunto(valor)
   // alert("- voce selecionou " + valor + " - " + sentenca)
   }

   
   

  

  inicia()

   return (
 
     <View style={{ flex: 1, padding: 24 }}>
       {isLoading ? <Text>Loading...</Text> : 
       ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
           <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>
       {assunto} {colaborador.nome}
            Dados do StackOverFlow:</Text>
           <FlatList
             data={data}
             keyExtractor={(item, codigo) => codigo}
             renderItem={({ item }) => (
               <Text>{'[' + item.codigo + ']' + '\n' + item.nome + '\n\n' }</Text>
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
      items={data}
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