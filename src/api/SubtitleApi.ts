import { useMutation } from 'react-query';

import { SubtitleDTO } from 'types/subtitle';

export default class SubtitleApi {
  public static Post = () => useMutation(
    async ({
      subtitle: {
        fansubAcronym,
        animeSlug,
        episodeNumber,
        file,
      },
      token,
    } : { subtitle: SubtitleDTO, token?: string }) => {
      const formData = new FormData();

      formData.append('animeSlug', animeSlug);
      formData.append('episodeNumber', episodeNumber.toString());
      formData.append('fansubAcronym', fansubAcronym);
      formData.append('file', file);

      return (await fetch('subtitle', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })).json();
    },
  );
}
