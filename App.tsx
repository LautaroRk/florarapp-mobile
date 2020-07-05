/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {
  StatusBar,
} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { theme, Colors } from './src/config/theme';

import AppNavigator from './AppNavigator';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary_dark} />
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
