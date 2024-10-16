import * as React from 'react';
 import { View, Text, Button } from 'react-native';

 function AboutScreen({navigation}) {




    function ola(){
        alert(90)
    }

    this.ola = ola

    AboutScreen.ola = ola

     return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>About Screen</Text>
         <Button title='Ir para Home' onPress={() => navigation.navigate('Home')} />
     </View>
     );
 }

 function ola(){
    alert(9);
 }

 export default AboutScreen;