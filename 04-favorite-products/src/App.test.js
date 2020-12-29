import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import App from './App';
import productReducer from './store/reducers/products';

test('renders learn react link', () => {
  const rootReducer = combineReducers({
    shop: productReducer
  });

  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/All Products/i);
  expect(linkElement).toBeInTheDocument();
});
