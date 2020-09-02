import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { PokemonData } from '../model';

const loadInitialData = async (): Promise<PokemonData[]> => {
  const jsonPath = `${FileSystem.documentDirectory || ''}pokemonInfo.json`;
  const info = await FileSystem.getInfoAsync(jsonPath);
  if (info.exists) {
    const json = await FileSystem.readAsStringAsync(jsonPath);
    const pokemonInfo = JSON.parse(json) as PokemonData[];
    return pokemonInfo;
  }
  return [];
};

const useLocalInfo = (): PokemonData[] | null => {
  const [pokemonData, setPokemonData] = useState<PokemonData[] | null>(null);
  useEffect(() => {
    loadInitialData().then((res): void => {
      setPokemonData(res);
    }).catch(()=> {
      setPokemonData([]);
    });
  }, []);
  return pokemonData;
};

export default useLocalInfo;
