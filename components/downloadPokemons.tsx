import React from 'react';
import { Button, View, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import usePokemonDownloader from '../hooks/usePokemonDownloader';

const Title = styled.Text`
  color: #ff4;
  font-size: 20px;
`;

const Body = styled.Text`
  color: #ff4;
  font-size: 12px;
  margin: 15px;
`;

const ProgressBackground = styled.View`
  background-color: #fff;
  width: 80%;
  height: 10px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 2px;
`;

const onClick = (): void => {
  alert('Aloha!');
};

const DownloadPokemons = (): JSX.Element => {
  const downloadStatus = usePokemonDownloader();

  const progressBarStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#0f0',
    width: `${downloadStatus.percent}%`,
    padding: 2,
    borderRadius: 10,
  };

  return (
    <>
      <Button onPress={onClick} title="Hola">
        HOLA!
      </Button>
      <Title>Pokédex</Title>
      <Body>{`Descargando ${downloadStatus.downloaded} de ${downloadStatus.total} Pokémon`}</Body>
      <ProgressBackground>
        <View style={progressBarStyle} />
      </ProgressBackground>
    </>
  );
};

export default DownloadPokemons;
