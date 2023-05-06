import { Duration } from 'luxon';

import Formatter from 'app/formatter';
import Helper from 'app/helper';
import SubtitleLanguage from 'enums/SubtitleLanguage';
import { Episode } from 'types/episode';
import { AnimeSubtitles, EpisodeSubtitle } from 'types/subtitle';

import './episodes.scss';

type Props = {
  episodes: Episode[],
  animeSubtitles: AnimeSubtitles,
};

const Header = () => (
  <tr>
    <th><abbr title="Number">#</abbr></th>
    <th>Name</th>
    <th>Duration</th>
    <th>Aired</th>
    <th>Subtitles</th>
  </tr>
);

type RowProp = {
  episode: Episode,
  episodeSubtitles: EpisodeSubtitle[],
};

const flagsEmoji = {
  [SubtitleLanguage.Japanese]: '🇯🇵',
  [SubtitleLanguage.English]: '🇺🇸',
  [SubtitleLanguage.SpanishCastilian]: '🇪🇸',
  [SubtitleLanguage.SpanishLatin]: '🇲🇽',
};

const Row = ({
  episode: {
    number,
    name,
    duration,
    aired,
  },
  episodeSubtitles,
}: RowProp) => (
  <tr>
    <th>{number}</th>
    <td>{name}</td>
    <td>
      {Helper.toHuman(Duration.fromObject({ minutes: duration ?? undefined }))}
    </td>
    <td>{Formatter.DateFull(aired)}</td>
    <td>
      {episodeSubtitles?.map(({ acronym, url, language }) => (
        <a href={`${process.env.REACT_APP_API}${url}`} key={url}>
          {`${acronym} ${flagsEmoji[language]}`}
        </a>
      ))}
    </td>
  </tr>
);

const Episodes = ({ episodes, animeSubtitles }: Props) => (
  <table id="episodes" className="table is-fullwidth">
    <thead>
      <Header />
    </thead>
    <tfoot>
      <Header />
    </tfoot>
    <tbody>
      {
        episodes.map(
          (episode) => <Row episode={episode} key={episode.id} episodeSubtitles={animeSubtitles[episode.number]} />,
        )
      }
    </tbody>
  </table>
);

export default Episodes;
