import React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { Text, View, Image, Table } from 'react-native';
import DownloadPokemons from './components/downloadPokemons';
import useLocalInfo from './hooks/useLocalInfo';
import PokemonThumnail from './components/pokemonThumnail';

const Container = styled.View`
  flex: 1;
  background-color: #336;
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
              width: 150,
              height: 150,
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
      {pokemonData?.map((pokemon) => (
        <PokemonThumnail key={pokemon.id} pokemonData={pokemon} />
      ))}
      <StatusBar style="auto" />
    </Container>
  );
};

export default app;
