import React from 'react';
import styled from 'styled-components/native';
import { Image, Text } from 'react-native';
import { PokemonData } from '../model';

const PokemonSmallImage = styled.Image`
  width: 150;
  height: 150;
  display: 'block';
  padding: 2;
`;

const PokemonThumnail = (pokemonData: PokemonData): JSX.Element => {
  //   return <PokemonSmallImage source={{ uri: pokemonData.imageLocalURI }} />;
  //console.log(pokemonData.name);
  return <Text>{pokemonData.name}</Text>;
};

export default PokemonThumnail;
