import { useState, useEffect } from "react";
import { DownloadStatus, PokemonListAPIResult } from "../model";
import axios from 'axios';
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
    data.results.forEach((item): void => {
      console.log(item.name);
    });
  };
  useEffect(() => {
    downloadAllPokemonInfo();
  }, []);
  return downloadStatus;
}

export default usePokemonDownloader;