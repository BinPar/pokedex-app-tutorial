import { useState, useEffect } from "react";
import { DownloadStatus, PokemonListAPIResult, PokemonDataAPI } from "../model";
import axios from 'axios';
import FileSystem from 'expo-file-system';
import settings from '../settings';

const usePokemonDownloader = (): DownloadStatus => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({
    downloaded: 0,
    total: 0,
    percent: 0,
  });

  const downloadAllPokemonInfo = async (): Promise<void> => {
    const result = await axios.get<PokemonListAPIResult>(`${settings.apiURL}/pokemon?limit=${settings.maxPokemons}`);
    const data = result.data;
    setDownloadStatus(current => ({...current, total: data.count}));
    data.results.forEach(async (item): Promise<void> => {
      const pokemonResult = await axios.get<PokemonDataAPI>(item.url);
      const pokemonData = pokemonResult.data;
      const imageURL = pokemonData.sprites.front_default;
      console.log(imageURL);

      
      const downloadImage = FileSystem.createDownloadResumable(
        imageURL,
        `${FileSystem.documentDirectory}images/${pokemonData.id}.png`
      );
      const result = await downloadImage.downloadAsync();
      if (result) {
        const imageLocalURI = result.uri;
        console.log(imageLocalURI);
      }
      setDownloadStatus(current => (
        {
          ...current, 
          percent: ((current.downloaded + 1) / current.total ) * 100,
          downloaded: current.downloaded + 1}));
    });
  };
  useEffect(() => {
    downloadAllPokemonInfo();
  }, []);
  
  return downloadStatus;
}

export default usePokemonDownloader;