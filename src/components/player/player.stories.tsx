// eslint-disable-next-line storybook/story-exports
import { Story } from '@storybook/react/types-6-0';

import Player from './player';

export default {
  title: 'Alm VideoJS Editor/Player',
  component: Player,
};

const Template: Story = (args) => (
  <div>
    <Player {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
};