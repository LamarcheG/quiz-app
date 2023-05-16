import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MyStacks } from "./MyStacks";
import { UserContext } from "../../Stores/UserContext";
import { StacksContext } from "../../Stores/StacksContext";
import { BrowserRouter } from "react-router-dom";

describe("MyStacks", () => {
  it("should render the stacks", async () => {
    const stacksState = {
      stacks: [
        {
          id: "1",
          name: "test",
          stats: {
            nbOfStats: 1,
            averageTime: 1,
            averageScore: 1,
          },
        },
      ],
    };
    const userState = {
      user: {
        name: "Guillaume",
        email: "test@email.com",
        uid: "Hu88lIByGDI2NJtO2eFF",
      },
    };

    const wrapper = ({ children }: any) => (
      <UserContext.Provider value={userState as any}>
        <StacksContext.Provider value={stacksState as any}>
          <BrowserRouter>{children}</BrowserRouter>
        </StacksContext.Provider>
      </UserContext.Provider>
    );
    render(<MyStacks />, { wrapper });

    let stackName = await screen.findByText("test");

    expect(stackName).toBeInTheDocument();
  });
});
