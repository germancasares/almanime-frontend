import { render } from '@testing-library/react';
import { test } from 'vitest';
import Poster from './poster';

test('renders without crashing', () => {
  render(<Poster />);
});
