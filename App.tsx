import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import DownloadPokemons from './components/DownloadPokemons';
import useLocalInfo from './hooks/useLocalInfo';

const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const app = (): JSX.Element => {
  const pokemonData = useLocalInfo();
  let content = <Text>Loading</Text>;
  if (pokemonData) {
    if (pokemonData.length === 0) {
      content = <DownloadPokemons />;
    } else {
      content = (
        <View>
          <Text>{pokemonData[0].name}</Text>
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri: pokemonData[0].imageLocalURI,
            }}
          />
        </View>
      );
    }
  }
  return (
    <Container>
      {content}
      <StatusBar style="auto" />
    </Container>
  );
};

export default app;
