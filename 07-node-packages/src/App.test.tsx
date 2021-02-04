import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('Should render <App />', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search For an NPM Package/i);
  expect(linkElement).toBeInTheDocument();
});
