import Episode from 'types/episode';
import Formatter from 'app/formatter';
import './episodes.scss';

type Props = {
  episodes: Episode[]
};

const Episodes = ({ episodes }: Props): JSX.Element => (
  <table id="episodes" className="table is-fullwidth">
    <thead>
      <Header />
    </thead>
    <tfoot>
      <Header />
    </tfoot>
    <tbody>
      {episodes.map((episode) => <Row episode={episode} key={episode.id} />)}
    </tbody>
  </table>
);

const Header = () => (
  <tr>
    <th><abbr title="Number">#</abbr></th>
    <th>Name</th>
    <th>Duration</th>
    <th>Aired</th>
  </tr>
);

type RowProp = {
  episode: Episode;
};

const Row = ({
  episode,
}: RowProp) => (
  <tr>
    <th>{episode.number}</th>
    <td>{episode.name}</td>
    <td>{episode.duration}</td>
    <td>{Formatter.DateFull(episode.aired)}</td>
  </tr>
);

export default Episodes;
