import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { View, StyleProp, ViewStyle } from 'react-native';
import { DownloadStatus } from '../model';

const Container = styled.View`
  flex: 1;
  background-color: #336;
  align-items: center;
  justify-content: center;
`;

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
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({
    downloaded: 0,
    total: 1000,
    percent: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadStatus((current) => {
        const newValue = { ...current };
        if (newValue.downloaded < newValue.total) {
          newValue.downloaded += 100;
          newValue.percent = Math.floor((newValue.downloaded / newValue.total) * 100);
        } else {
          clearInterval(interval);
        }
        return newValue;
      });
    }, 100);
    return (): void => {
      clearInterval(interval);
    };
  }, []);

  const progressStyle: StyleProp<ViewStyle> = {
    width: `${downloadStatus.percent}%`,
    height: 4,
    backgroundColor: '#fe7',
    borderRadius: 4,
  };

  return (
    <Container>
      <Title>POKEDEX</Title>
      <Body>{`Descargando ${downloadStatus.downloaded} de ${downloadStatus.total}`}</Body>
      <Progress>
        <View style={progressStyle} />
      </Progress>
      <StatusBar style="auto" />
    </Container>
  );
};

export default DownloadPokemon;
