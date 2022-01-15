import { getSubtitles } from 'app/fansub/store/actions';
import { State } from 'app/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Subtitles = ({ acronym }: { acronym?: string }) => {
  const dispatch = useDispatch();

  const subtitles = useSelector((state: State) => state.fansub.subtitles);

  useEffect(() => {
    if (acronym === undefined) return;

    dispatch(getSubtitles(acronym));
  }, [acronym, dispatch]);

  return (
    <>
      {
        subtitles.map((subtitle) => (
          <div key={subtitle.id}>
            <a href={subtitle.url}>
              {subtitle.user} {subtitle.anime} {subtitle.episode} {subtitle.format} {subtitle.creationDate}
            </a>
          </div>
        ))
      }
    </>
  );
};

export default Subtitles;
