import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../src/Components/Button';

describe('Button', () => {
  test('renders button text', () => {
    render(<Button btn='BUTTON_BLUE' option = 'small' >Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button  btn='BUTTON_BLUE' option = 'small' onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
