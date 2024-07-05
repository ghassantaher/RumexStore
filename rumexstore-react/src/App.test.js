import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(
    /ATTENTION: This Website is for training/i,
  );
  expect(linkElement).toBeInTheDocument();
});

afterEach(cleanup);

test('When App first rendered, loading indicator should show', async () => {
  const { container } = render(<App />);
  const loading = container.getElementsByClassName('lds-spinner');
  expect(loading).not.toBeNull();
});
