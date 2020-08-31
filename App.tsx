import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import DownloadPokemons from './components/DownloadPokemons';

const app = (): JSX.Element => (
  <DownloadPokemons />
);

export default app;
