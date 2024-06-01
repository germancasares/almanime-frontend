import { render } from '@testing-library/react';
import { test } from 'vitest';
import Theme from '../../../enums/Theme';
import ThemeSwitch from './themeSwitch';

test('renders without crashing', () => {
  render(
    <ThemeSwitch
      theme={Theme.Light}
      toggleTheme={() => {}}
    />,
  );
});
