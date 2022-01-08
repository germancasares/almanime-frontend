import Season from 'enums/Season';
import fall from 'assets/season/fall.jpg';
import spring from 'assets/season/spring.jpg';
import summer from 'assets/season/summer.jpg';
import winter from 'assets/season/winter.jpg';
import cover from 'assets/default-cover.jpg';
import './hero.scss';

type Props = {
  season?: Season,
  image?: string,
};

const defaultImage = (season?: Season): string => {
  switch (season) {
    case Season.Fall:
      return fall;
    case Season.Spring:
      return spring;
    case Season.Summer:
      return summer;
    case Season.Winter:
      return winter;
    default:
      return cover;
  }
};

const Hero = ({
  season,
  image = defaultImage(season),
}: Props) => (
  <div id="hero" className="hero is-medium">
    <figure className="image">
      <img src={image} alt="" />
      <div className="overlay">
        <div />
      </div>
    </figure>
  </div>
);

export default Hero;
