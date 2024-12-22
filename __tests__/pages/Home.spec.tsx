import 'intersection-observer';

import React from "react";
import "@testing-library/jest-dom";
import "@testing-library/react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Link, MemoryRouter, Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";

import Home from '../../src/Pages/Home/index';

// /__tests__/pages/Home.spec.tsx

jest.spyOn(console, 'warn').mockImplementation(() => { });

jest.mock("../../src/assets/logo.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-x-turn.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-o-turn.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-restart.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/no-user.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-x.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-o.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-x-outline.svg", () => ({
    ReactComponent: () => null,
}));

jest.mock("../../src/assets/icon-o-outline.svg", () => ({
    ReactComponent: () => null,
}));


function handleHome() {

    renderWithRouter(<Home />, { route: "/single_player" });

    // render(
    //     <BrowserRouter>
    //         <Home />
    //     </BrowserRouter>
    // );
}


function renderWithRouter(ui, { route = "/" } = {}) {
    window.history.pushState({}, "Test Page", route);

    return render(ui, { wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter> });
}

describe("Home", () => {

    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("render page Home", () => {
        handleHome();

        expect(screen.getByText("VEZ")).toBeInTheDocument();

        expect(screen.getByText("X (P2)")).toBeInTheDocument();
        expect(screen.getByText("VELHAS")).toBeInTheDocument();
        expect(screen.getByText("O (P1)")).toBeInTheDocument();

        expect(screen.getByAltText("logo do site")).toBeInTheDocument();
        expect(screen.getByAltText("de quem é o turno")).toBeInTheDocument();
        expect(screen.getByAltText("icone de restart")).toBeInTheDocument();

        expect(screen.getByAltText("de quem é o turno")).toBeInTheDocument();
    });

});

