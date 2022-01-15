import { useMutation } from 'react-query';
import { SubtitleDTO } from 'types/subtitle';

export default class SubtitleApi {

  public static Post = () => useMutation(
    async ({ subtitle, token } : { subtitle: SubtitleDTO, token?: string }) => {
      const formData = new FormData();

      formData.append('animeSlug', subtitle.animeSlug);
      formData.append('episodeNumber', subtitle.episodeNumber.toString());
      formData.append('fansubAcronym', subtitle.fansubAcronym);
      formData.append('file', subtitle.file);

      return (await fetch('subtitle', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })).json();
    },
  );

}
