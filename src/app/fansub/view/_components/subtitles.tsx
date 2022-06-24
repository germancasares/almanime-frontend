import FansubApi from 'api/FansubApi';

import Loader from 'components/loader';

const Subtitles = ({ acronym }: { acronym?: string }) => {
  const { data: subtitles } = FansubApi.GetSubtitles(acronym);

  if (!subtitles) return (<Loader />);

  return (
    <>
      {
        subtitles.map(({
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
