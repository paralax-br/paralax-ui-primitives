import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Combobox } from '../src';

const App = () => {
  return (
    <Combobox>
      <Combobox.Trigger>
        <Combobox.Value />
        <Combobox.Cancel />
      </Combobox.Trigger>

      <Combobox.Content>
        <Combobox.SearchInput />
        <Combobox.ItemsList>
          <Combobox.Item value="option-1">
            <Combobox.ItemLabel>Option 1</Combobox.ItemLabel>

            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.ItemsList>
      </Combobox.Content>
    </Combobox>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
