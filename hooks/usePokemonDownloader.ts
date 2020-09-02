/* eslint-disable no-await-in-loop */
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { DownloadStatus, PokemonListAPIResult, PokemonDataAPI, PokemonData } from '../model';
import settings from '../settings';

const usePokemonDownloader = (): DownloadStatus => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({
    downloaded: 0,
    total: 0,
    percent: 0,
  });

  const downloadAllPokemonInfo = async (): Promise<void> => {
    const result = await axios.get<PokemonListAPIResult>(
      `${settings.apiURL}/pokemon?limit=${settings.maxPokemons}`,
    );
    const { data } = result;
    const basePath = `${FileSystem.documentDirectory || ''}images`;

    try {
      await FileSystem.deleteAsync(basePath);
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);
    }
    await FileSystem.makeDirectoryAsync(basePath);

    const pokemonInfo = new Array<PokemonData>();

    if (data) {
      setDownloadStatus((current) => ({ ...current, total: data.count }));
      for (let i = 0; i < data.results.length; i++) {
        const item = data.results[i];
        const pokemonResult = await axios.get<PokemonDataAPI>(item.url);
        const pokemonData = pokemonResult.data;
        setDownloadStatus((current) => ({
          ...current,
          percent: ((current.downloaded + 1) / current.total) * 100,
          downloaded: current.downloaded + 1,
        }));
        const imageURL = pokemonData.sprites.front_default;
        if (imageURL) {
          const downloadImage = FileSystem.createDownloadResumable(
            imageURL,
            `${basePath}/${pokemonData.id}.png`,
          );
          const imageDownloadResult = await downloadImage.downloadAsync();

          const stats = pokemonData.stats.reduce<{ [name: string]: number }>(
            (current, stat) => ({
              ...current,
              [stat.stat.name]: stat.base_stat,
            }),
            {},
          );

          if (imageDownloadResult) {
            const imageLocalURI = imageDownloadResult.uri;
            pokemonInfo.push({
              id: pokemonData.id,
              name: pokemonData.name,
              height: pokemonData.height,
              weight: pokemonData.weight,
              imageURL,
              imageLocalURI,
              types: pokemonData.types.map((typeNode) => typeNode.type.name),
              stats,
            });
          }
        }
      }
      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory || ''}pokemonInfo.json`,
        JSON.stringify(pokemonInfo),
      );
    }
  };
  useEffect(() => {
    downloadAllPokemonInfo().then(
      (): void => {
        setDownloadStatus((current) => ({ ...current, percent: 100 }));
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      },
    );
  }, []);

  return downloadStatus;
};

export default usePokemonDownloader;
