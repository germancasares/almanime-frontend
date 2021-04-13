import poster from 'assets/default-poster.jpg';
import './poster.scss';

type Props = {
  image?: string,
};

const Poster = ({ image = poster }: Props): JSX.Element => (
  <figure className="poster image is-clipped">
    <img src={image} alt="" />
  </figure>
);

export default Poster;
