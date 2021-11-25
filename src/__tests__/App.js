import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom'
import mockAxios from 'jest-mock-axios';
afterEach(() => {
  mockAxios.reset();
});
beforeEach(() => {
  mockAxios.reset();
});
test('renders the header and footer', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getAllByText(/weather app/i);
  expect(linkElement.length).toBe(2);
});

test('expect geo API to be called', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(mockAxios.get).toHaveBeenCalledWith('https://geolocation-db.com/json/');
})

test('expect geo API to throw exception', () => {
  try {
    render(<BrowserRouter><App /></BrowserRouter>);
    mockAxios.get.mockRejectedValue(new Error('error'))
  } catch (err) {
    expect(mockAxios.get).toEqual({error: 'error'})
  }
})