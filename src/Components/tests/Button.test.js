import { render, screen } from '@testing-library/react';
import Button from '../Button';

import "@testing-library/jest-dom";

describe("Button", () => {
    it("should render correctly", () => {
        render(
            <Button btn='BUTTON_BLUE' option='small'>Página</Button>
        )

        expect(screen.getByText("Página")).toBeInTheDocument();
    })
})
