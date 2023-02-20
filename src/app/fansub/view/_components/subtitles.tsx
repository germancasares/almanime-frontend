import FansubApi from 'api/FansubApi';

import Loader from 'components/loader';

const Subtitles = ({ acronym, token }: { acronym?: string, token?: string }) => {
  const { data: publishedSubtitles } = FansubApi.GetSubtitles(acronym);
  const { data: draftedSubtitles } = FansubApi.GetSubtitlesDrafts(acronym, token);

  if (!publishedSubtitles) return (<Loader />);

  return (
    <>
      {
        publishedSubtitles.map(({
          id, url, user, anime, episode, format, creationDate,
        }) => (
          <div key={id}>
            <a href={`${process.env.REACT_APP_API}${url}`}>
              {`${user} ${anime} ${episode} ${format} ${creationDate} `}
            </a>
          </div>
        ))
      }
      {
        draftedSubtitles?.map(({
          id, url, user, anime, episode, format, creationDate,
        }) => (
          <div key={id}>
            <a href={`${process.env.REACT_APP_API}${url}`}>
              {`${user} ${anime} ${episode} ${format} ${creationDate} `}
            </a>
          </div>
        ))
      }
    </>
  );
};

export default Subtitles;
