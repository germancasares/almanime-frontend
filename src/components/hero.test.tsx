import { render } from '@testing-library/react';
import { test } from 'vitest';
import Hero from './hero';

test('renders without crashing', () => {
  render(<Hero />);
});
