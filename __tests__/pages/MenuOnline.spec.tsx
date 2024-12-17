import React from 'react';
import "@testing-library/jest-dom";

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { act } from 'react';
import MenuOnline from '../../src/Pages/MenuOnline';
import { BrowserRouter } from 'react-router-dom';

jest.mock("../../src/assets/warn.svg", () => ({
  ReactComponent: () => null
}))

jest.mock("../../src/assets/reload.svg", () => ({
  ReactComponent: () => null
}))

jest.mock("../../src/assets/logo.svg", () => ({
  ReactComponent: () => null
}))

jest.mock("../../src/assets/no-user.svg", () => ({
  ReactComponent: () => null
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn()
}));

function handleMenuOnline() {
  return render(<BrowserRouter> <MenuOnline /> </BrowserRouter>);
}

describe('MenuOnline component', () => {

  beforeEach(() => {
    localStorage.setItem('token', '"your_test_token_here"');
  });

  it("render text and photo", () => {
    handleMenuOnline();

    expect(screen.getByAltText("logo do site")).toBeInTheDocument();
    expect(screen.getByAltText("foto do usuario")).toBeInTheDocument();

    expect(screen.getByText("Procurar Partida")).toBeInTheDocument();
  })

  it("reload after click on button", async () => {
    await act(async () => {
      handleMenuOnline();
    });

    expect(screen.getByRole('button')).toHaveTextContent('Procurar Partida');

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    // Esperar pela renderização do componente Reload
    await waitFor(() => {
      expect(screen.getByAltText("rotation right")).toBeInTheDocument();
    });

  });

});
