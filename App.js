import * as React from 'react';
 import { View, Text } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import Login from './login'; 

 import Abas from './abas';


 import Respostas from './respostas';

 const Stack = createNativeStackNavigator();

 function App() {
     return (
     <NavigationContainer>
         <Stack.Navigator>
         <Stack.Screen name='login' component={Login} />
         <Stack.Screen name='aba' component={Abas} options={{ headerShown: false }}  />
         <Stack.Screen name='respostas' component={Respostas} options={{ headerShown: true }}  />
         </Stack.Navigator>
     </NavigationContainer>
     );
 }

 export default App;