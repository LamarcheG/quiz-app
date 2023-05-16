import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MyStacksItem } from "./MyStacksItem";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("MyStacksItem", () => {
  it("should render the stats", async () => {
    const props = {
      stack: {
        id: "1",
        name: "test",
        stats: {
          nbOfStats: 1,
          averageTime: 1,
          averageScore: 1,
        },
      },
      isEditing: false,
      deleteStack: jest.fn(),
    };
    render(<MyStacksItem {...props} />, { wrapper: BrowserRouter });

    let nbOfStats = await screen.findByText("Completed: 1 time");
    let averageTime = await screen.findByText("Average time: 1 seconds");
    let averageScore = await screen.findByText("Average score: 1%");

    expect(nbOfStats).toBeInTheDocument();
    expect(averageTime).toBeInTheDocument();
    expect(averageScore).toBeInTheDocument();
  });

  it("should go to the stack page when clicking on the stack name", async () => {
    const props = {
      stack: {
        id: "1",
        name: "test",
        stats: {
          nbOfStats: 1,
          averageTime: 1,
          averageScore: 1,
        },
      },
      isEditing: false,
      deleteStack: jest.fn(),
    };
    render(<MyStacksItem {...props} />, { wrapper: BrowserRouter });

    let stackName = await screen.findByText("test");

    await userEvent.click(stackName);

    expect(window.location.pathname).toBe("/stacks/1/quiz");
  });
});
