import FansubApi from 'api/FansubApi';

const Subtitles = ({ acronym }: { acronym?: string }) => {
  const { data: subtitles } = FansubApi.GetSubtitles(acronym);

  return (
    <>
      {
        subtitles && subtitles.map((subtitle) => (
          <div key={subtitle.id}>
            <a href={`${process.env.REACT_APP_API}${subtitle.url}`}>
              {subtitle.user} {subtitle.anime} {subtitle.episode} {subtitle.format} {subtitle.creationDate}
            </a>
          </div>
        ))
      }
    </>
  );
};

export default Subtitles;
