import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title} </Text>
      <Image
        source={{ uri:'https://quemsabefala.uniconecta.com.br/mentorMw/imgs/quemsabefala2.png?a'  }} // substitua pela URL da sua imagem
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#8ba9b3',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default CustomHeader;
