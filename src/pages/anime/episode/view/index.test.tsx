import { render } from '@testing-library/react';
import { test } from 'vitest';
import View from '.';

test('renders without crashing', () => {
  render(<View />);
});
