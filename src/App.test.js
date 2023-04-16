import { render, screen } from "@testing-library/react";
import App from "./components/App";

test("twitter clone app", () => {
    render(<App />);
    const headingElem = screen.getByText(/트위터/i);
    expect(headingElem).toBeInTheDocument();

    const lintTest = screen.getAllByRole("button", {
        name: "lintTest",
    });

    expect(lintTest).toHaveTextContent("테스트 버튼");
});
