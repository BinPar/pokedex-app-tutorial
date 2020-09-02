export interface DownloadStatus {
  downloaded: number;
  total: number;
  percent: number;
}

export interface PokemonListAPIResult {
  count: number;
  results: {
    url: string;
    name: string;
  }[];
}