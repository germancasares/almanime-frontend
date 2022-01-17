import { Episode, EpisodeFansubs, FansubSubtitles } from 'types/episode';
import Formatter from 'app/formatter';
import './episodes.scss';

type Props = {
  episodes: Episode[],
  episodeFansubs: EpisodeFansubs,
};

const Episodes = ({ episodes, episodeFansubs }: Props) => (
  <table id="episodes" className="table is-fullwidth">
    <thead>
      <Header />
    </thead>
    <tfoot>
      <Header />
    </tfoot>
    <tbody>
      {episodes.map((episode) => {
        return <Row episode={episode} key={episode.id} fansubs={episodeFansubs[episode.number]} />;
      })}
    </tbody>
  </table>
);

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
  episode,
  fansubs,
}: RowProp) => (
  <tr>
    <th>{episode.number}</th>
    <td>{episode.name}</td>
    <td>{episode.duration}</td>
    <td>{Formatter.DateFull(episode.aired)}</td>
    <td>{Object.entries(fansubs).map(([fansub, subtitle]) => (
      <a href={subtitle} key={fansub}>
        {fansub}
      </a>
    ))}</td>
  </tr>
);

export default Episodes;
