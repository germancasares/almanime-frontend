import { Link } from 'react-router-dom';
import { mdiStar, mdiStarOutline } from '@mdi/js';
import Icon from '@mdi/react';
import cover from 'assets/default-cover.jpg';

import './panel.scss';

type Props = {
  name: string,
  to: string,
  image?: string,
  imageRes?: string,
  star: {
    shouldShow: boolean,
    isSelected: boolean,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  }
};

const Panel = ({
  name,
  to,
  image = cover,
  imageRes = 'is-16by9',
  star,
}: Props) => (
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
    {
      star.shouldShow && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div role="button" className="star" onClick={star.onClick} tabIndex={0}>
          <Icon size={1} path={star.isSelected ? mdiStar : mdiStarOutline} />
        </div>
      )
    }
  </div>
);

export default Panel;
