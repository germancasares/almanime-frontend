import routes from 'app/routes';
import { Link } from 'react-router-dom';
import cover from 'assets/default-cover.jpg';
import './panel.scss';

type Props = {
  image: string | null,
  name: string,
  imageRes?: string,
};

const Panel = ({ name, image, imageRes = 'is-16by9' }: Props): JSX.Element => (
  <div className="panel">
    <Link to={routes.home.path}>
      <div className="overlay" />
      <figure className={`image ${imageRes}`}>
        <img src={image || cover} alt={name} />
      </figure>
      <div className="name">
        {name}
      </div>
    </Link>
  </div>
);

export default Panel;
