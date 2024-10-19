import * as React from 'react';
 import { View, Text , ImageBackground, StyleSheet} from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import Login from './login'; 

 import Abas from './abas';


 import Respostas from './respostas';

 const Stack = createNativeStackNavigator();

 function App() {
     return (
     <NavigationContainer>
         <Stack.Navigator
          screenOptions={{
            headerBackground: () => (
              <ImageBackground
                source={{ uri: 'https://quemsabefala.conectasuas.com.br/mentorMw/imgs/quemsabefala.png' }} // URL da sua imagem
                style={styles.headerBackground}
              />
            ),
            headerTintColor: 'white', // Cor do texto do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
         >

        

         <Stack.Screen name='login' component={Login} />
         <Stack.Screen name='aba' component={Abas} options={{ headerShown: false }}  />
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