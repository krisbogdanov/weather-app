import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../Pages/Home';
import mockAxios from 'jest-mock-axios';
import data from './data.json';
import { format } from 'date-fns'
afterEach(() => {
  mockAxios.reset();
});
beforeEach(() => {
  mockAxios.reset();
});
test('renders the default home component', () => {
  render(<Home geo={{ city: 'Pleven' }} />);
  const linkElement = screen.getByText(/Check the weather for other locations/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders the no data view', () => {
  render(<Home geo={{ city: 'Plev' }} />);
  const linkElement = screen.getByText(/Please refine your search/i);
  expect(linkElement).toBeInTheDocument();
});

test('expect weather API to be called', () => {
  render(<Home geo={{ city: 'Pleven' }} />);
  expect(mockAxios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast?q=Pleven&appid=7f72dc5e70df4e2120ee00064ede9fc4&units=metric');
})

test('expect weather API to be called after props update', () => {
  const { rerender } = render(<Home geo={null} />);
  expect(mockAxios.get).not.toBeCalled()
  rerender(<Home geo={{ city: 'Pleven' }} />)
  expect(mockAxios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast?q=Pleven&appid=7f72dc5e70df4e2120ee00064ede9fc4&units=metric');
})

test('expect weather API to throw exception', () => {
  try {
    render(<Home geo={null} />);
    mockAxios.get.mockRejectedValue(new Error('error'))
  } catch (err) {
    expect(mockAxios.get).toEqual({ error: 'error' })
  }
})

test('renders the weather cards', async () => {
  mockAxios.get.mockResolvedValue({ data });
  render(<Home geo={{ city: 'Pleven' }} />);
  let linkElement = screen.getByText(/Please refine your search/i);
  expect(linkElement).toBeInTheDocument();
  await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
  linkElement = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(linkElement).toBeInTheDocument();
});

test('should trigger the search', async () => {
  mockAxios.get.mockResolvedValue({ data });
  render(<Home geo={{}} />);
  let linkElement = screen.getByText(/Please refine your search/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.keyUp(document.querySelector('#search-box'), { target: { value: 'Pleven' } })
  await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
  linkElement = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(linkElement).toBeInTheDocument();
});

test('renders the weather cards & opens the modal', async () => {
  mockAxios.get.mockResolvedValue({ data });
  render(<Home geo={{ city: 'Pleven' }} />);
  let linkElement = screen.getByText(/Please refine your search/i);
  expect(linkElement).toBeInTheDocument();
  await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1))
  linkElement = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement.parentNode)
  linkElement = screen.getByText(/Forcast for/i)
  expect(linkElement).toBeInTheDocument();
});

