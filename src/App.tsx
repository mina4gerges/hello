/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/about";
import Users from "./pages/users";
import Home from "./pages/home";

export default function App() {
  return (
    <Router>
      <main css={styles}>
        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

const styles = css`
  background-color: white;
`;
