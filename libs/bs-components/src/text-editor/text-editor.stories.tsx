import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import { TextEditor } from './text-editor';

export default {
  component: TextEditor,
  title: `containers/${TextEditor.name}`,
} as Meta;

const Template: Story<ComponentProps<typeof TextEditor>> = (args) => <TextEditor {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
