// App.js
import React from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import store from './src/redux/Store';
import { Provider } from 'react-redux';
import { PortfolioProvider } from './src/screens/PorfolioContext'; // Import your PortfolioProvider

export default function App() {
  return (
    <Provider store={store}>
      <PortfolioProvider>
        <AppNavigator />
      </PortfolioProvider>
    </Provider>
  );
}
