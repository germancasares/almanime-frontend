import { render } from '@testing-library/react';
import { test } from 'vitest';
import Tabs, { TabName } from './tabs';

test('renders without crashing', () => {
  render(
    <Tabs
      activeTab={TabName.Newest}
      changeTab={() => {}}
    />,
  );
});
