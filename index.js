/* eslint-disable prettier/prettier */
/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
