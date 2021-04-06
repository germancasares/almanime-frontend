import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Hello = (): JSX.Element => (
  <>
    <div className="hello container">
      Hello
    </div>
    <Link to="/world">World</Link>
  </>
);
export default Hello;
