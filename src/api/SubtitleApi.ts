import { SubtitleDTO } from 'types/subtitle';

class SubtitleApi {

  public static async Post(subtitle: SubtitleDTO, accessToken: string): Promise<void> {
    const formData = new FormData(); // Currently empty

    formData.append('animeSlug', subtitle.animeSlug);
    formData.append('episodeNumber', subtitle.episodeNumber.toString());
    formData.append('fansubAcronym', subtitle.fansubAcronym);
    formData.append('file', subtitle.file);

    fetch('subtitle', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  }

}

export default SubtitleApi;
