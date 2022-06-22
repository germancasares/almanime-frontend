import { Episode, EpisodeFansubs, FansubSubtitles } from 'types/episode';
import Formatter from 'app/formatter';
import './episodes.scss';

type Props = {
  episodes: Episode[],
  episodeFansubs: EpisodeFansubs,
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
  fansubs: FansubSubtitles,
};

const Row = ({
  episode: {
    number,
    name,
    duration,
    aired,
  },
  fansubs,
}: RowProp) => (
  <tr>
    <th>{number}</th>
    <td>{name}</td>
    <td>
      {`${duration}'`}
    </td>
    <td>{Formatter.DateFull(aired)}</td>
    <td>
      {Object.entries(fansubs).map(([fansub, subtitle]) => (
        <a href={`${process.env.REACT_APP_API}${subtitle}`} key={fansub}>
          {fansub}
        </a>
      ))}
    </td>
  </tr>
);

const Episodes = ({ episodes, episodeFansubs }: Props) => (
  <table id="episodes" className="table is-fullwidth">
    <thead>
      <Header />
    </thead>
    <tfoot>
      <Header />
    </tfoot>
    <tbody>
      {episodes.map((episode) => <Row episode={episode} key={episode.id} fansubs={episodeFansubs[episode.number]} />)}
    </tbody>
  </table>
);

export default Episodes;
