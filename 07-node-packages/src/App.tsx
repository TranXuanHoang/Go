import React from 'react';
import { Provider } from 'react-redux';
import RepositoriesList from './components/RepositoriesList';
import { store } from './state';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Search For an NPM Package</h1>
        <RepositoriesList />
      </div>
    </Provider>
  );
}

export default App;
