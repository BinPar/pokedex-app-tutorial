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

interface BasicPokemonInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
}

export interface PokemonDataAPI extends BasicPokemonInfo {
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
  types: {
    type: {
      name: string;
    }
  }[];
}

export interface PokemonData extends BasicPokemonInfo {
  imageURL: string;
  imageLocalURI: string;
  types: string[];
  stats:  { [name: string] : number; }
}
