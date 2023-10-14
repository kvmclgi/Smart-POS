import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import NavBar from "../../components/NavBar/navBar";
import { BrowserRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";

const userContextProp = {
  value: {
    currentUser: {
      name: "dummyName",
    },
    setCurrentUser: jest.fn(),
  },
};

describe("NavBar", () => {
  const renderNavBar = () =>
    render(
      <BrowserRouter>
        <UserContext.Provider {...userContextProp}>
          <NavBar />
        </UserContext.Provider>
      </BrowserRouter>
    );
  test("should render a NavBar component properly", () => {
    renderNavBar();

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  test("should render a employee avatar component", () => {
    renderNavBar();

    const avatar = screen.getByRole("img", { name: "Avatar" });
    expect(avatar).toBeInTheDocument();
  });

  test("should render a logout button", () => {
    renderNavBar();

    const logoutButton = screen.getByTestId("logOutButton");
    expect(logoutButton).toBeInTheDocument();
  });

  test("should logout when logout button is clicked", async () => {
    user.setup();
    renderNavBar();

    const logoutButton = screen.getByTestId("logOutButton");
    await user.click(logoutButton);
    expect(userContextProp.value.setCurrentUser).toHaveBeenCalled();
  });
});
