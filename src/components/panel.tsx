import { Link } from 'react-router-dom';
import cover from 'assets/default-cover.jpg';
import './panel.scss';

type Props = {
  name: string,
  to: string,
  image?: string,
  imageRes?: string,
};

const Panel = ({
  name,
  to,
  image = cover,
  imageRes = 'is-16by9',
}: Props): JSX.Element => (
  <div className="panel">
    <Link to={to}>
      <div className="overlay" />
      <figure className={`image ${imageRes}`}>
        <img src={image} alt={name} />
      </figure>
      <div className="name">
        {name}
      </div>
    </Link>
  </div>
);

export default Panel;
