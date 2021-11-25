import { render, screen, fireEvent } from '@testing-library/react';
import WeatherCard from '../Components/WeatherCard';
import data from './data.json';
import { format } from 'date-fns'

test('should return null from the render', () => {
  const { container } = render(<WeatherCard info={null} />);
  expect(container).toBeEmptyDOMElement();
});

test('should render a weather card', () => {
  render(<WeatherCard info={data.list[0]} />);
  const element = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(element).toBeInTheDocument();
});
test('should not render description', () => {
  const mockedData = {
    "dt": 1637766000,
    "main": {
      "temp": 7.96,
      "feels_like": 5.97,
      "temp_min": 7.94,
      "temp_max": 7.96,
      "pressure": 1027,
      "sea_level": 1027,
      "grnd_level": 1014,
      "humidity": 79,
      "temp_kf": 0.02
    },
    "weather": [{
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }],
    "clouds": {
      "all": 79
    },
    "wind": {
      "speed": 3.15,
      "deg": 75,
      "gust": 5.09
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
      "pod": "n"
    },
    "dt_txt": "2021-11-24 15:00:00"
  }
  render(<WeatherCard info={Object.assign(mockedData, { weather: [] })} />);
  const element = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(element).toBeInTheDocument();
  const missing = document.getElementsByClassName('condition')
  expect(missing[0].innerHTML).toBe('')
});
test('should not render image', () => {
  const mockedData = {
    "dt": 1637766000,
    "main": {
      "temp": 7.96,
      "feels_like": 5.97,
      "temp_min": 7.94,
      "temp_max": 7.96,
      "pressure": 1027,
      "sea_level": 1027,
      "grnd_level": 1014,
      "humidity": 79,
      "temp_kf": 0.02
    },
    "weather": [{
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }],
    "clouds": {
      "all": 79
    },
    "wind": {
      "speed": 3.15,
      "deg": 75,
      "gust": 5.09
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
      "pod": "n"
    },
    "dt_txt": "2021-11-24 15:00:00"
  }
  render(<WeatherCard info={Object.assign(mockedData, { weather: [] })} />);
  const element = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(element).toBeInTheDocument();
  const missing = document.getElementsByClassName('image')
  expect(missing[0].innerHTML).toBe('')
});
test('should not render wind', () => {
  const mockedData = {
    "dt": 1637766000,
    "main": {
      "temp": 7.96,
      "feels_like": 5.97,
      "temp_min": 7.94,
      "temp_max": 7.96,
      "pressure": 1027,
      "sea_level": 1027,
      "grnd_level": 1014,
      "humidity": 79,
      "temp_kf": 0.02
    },
    "weather": [{
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }],
    "clouds": {
      "all": 79
    },
    "wind": {
      "speed": 3.15,
      "deg": 75,
      "gust": 5.09
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
      "pod": "n"
    },
    "dt_txt": "2021-11-24 15:00:00"
  }
  render(<WeatherCard info={Object.assign(mockedData, { wind: null })} />);
  const element = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(element).toBeInTheDocument();
  const missing = document.getElementsByClassName('wind')
  expect(missing[0].innerHTML).toBe('')
});
test('should simulate on click', () => {
  const mockFn = jest.fn()
  render(<WeatherCard info={data.list[0]} onClick={mockFn} />);
  const element = screen.getByText(format(new Date(data.list[0].dt_txt), 'cccc'))
  expect(element).toBeInTheDocument();
  fireEvent.click(element.parentNode)
  expect(mockFn).toHaveBeenCalledTimes(1)
});