import * as React from 'react';
 import { View, Text , ImageBackground, StyleSheet} from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import Login from './login'; 

 import Abas from './abas';

 import Respostas from './respostas';

 import CustomHeader from './cabecalho'; // Importar o cabeçalho

 const Stack = createNativeStackNavigator();

 function App() {
     return (
     <NavigationContainer>
         <Stack.Navigator
          
          screenOptions={({ route }) => ({
            header: () => <CustomHeader title={route.name} />,
          })}

         >

        

         <Stack.Screen name='login' component={Login} />
         <Stack.Screen name='quem sabe fala' component={Abas} options={{ headerShown: true }}  />
         <Stack.Screen name='respostas' component={Respostas} options={{ headerShown: true }}  />
         </Stack.Navigator>
     </NavigationContainer>
     );
 }


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

 export default App;