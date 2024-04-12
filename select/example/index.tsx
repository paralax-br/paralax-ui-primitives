import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Select } from '../src';

const App = () => {
  return (
    <Select>
      <Select.Trigger>
        <Select.Value />
        <Select.Cancel />
      </Select.Trigger>

      <Select.Content>
        <Select.Item value="option-1">
          <Select.ItemLabel>Option 1</Select.ItemLabel>
          <Select.ItemIndicator>✓</Select.ItemIndicator>
        </Select.Item>
      </Select.Content>
    </Select>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
