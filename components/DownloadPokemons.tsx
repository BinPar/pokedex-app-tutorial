import React from 'react';
import styled from 'styled-components/native';
import { View, StyleProp, ViewStyle } from 'react-native';
import usePokemonDownloader from '../hooks/usePokemonDownloader';

const Title = styled.Text`
  color: #ff4;
  font-weight: 900;
  font-size: 20px;
`;

const Body = styled.Text`
  color: #fff;
  font-size: 12px;
  margin: 15px;
`;

const Progress = styled.View`
  background-color: #123;
  width: 80%;
  height: 10px;
  border-radius: 10px;
  border: 1px solid white;
  padding: 2px;
`;

const DownloadPokemon = (): JSX.Element => {
  const downloadStatus = usePokemonDownloader();

  const progressStyle: StyleProp<ViewStyle> = {
    width: `${downloadStatus.percent}%`,
    height: 4,
    backgroundColor: '#fe7',
    borderRadius: 4,
  };

  return (
    <>
      <Title>POKEDEX</Title>
      <Body>{`Descargando ${downloadStatus.downloaded} de ${downloadStatus.total}`}</Body>
      <Progress>
        <View style={progressStyle} />
      </Progress>
    </>
  );
};

export default DownloadPokemon;
