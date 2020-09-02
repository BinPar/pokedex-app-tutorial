import React from 'react';
import DownloadPokemons from './components/DownloadPokemons';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';


const Container = styled.View`
  flex: 1;
  background-color: #336;
  align-items: center;
  justify-content: center;
`;

const app = (): JSX.Element => (
  <Container>
    <DownloadPokemons />
    <StatusBar style="auto" />
  </Container>
);

export default app;
