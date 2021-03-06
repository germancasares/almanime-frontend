import { AnimeIndex } from '@/models';
import Axios from 'axios';

export class ElasticService {

  public static async Anime(name: string): Promise<AnimeIndex[]> {
    return (await Axios.get(`search/anime/${name}`)).data;
  }

}
