import {expect, jest, test} from '@jest/globals'
import { render, screen } from '@testing-library/react';
import Home from '../Pages/Home';
console.log('Hi')
test('renders learn react link', () => {
  console.log('I AM IN')
  render(<Home geo={{city: 'Pleven'}}/>);
  const linkElement = screen.getByText(/Check the weather for other locations/i);
  expect(linkElement).toBeInTheDocument();
});

