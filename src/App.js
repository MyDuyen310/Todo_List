import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthPage from "./page/AuthPage";
import Layout from "./component/Layout/Layout";
import HomePage from "./page/HomePage";
import TodoPage from "./page/TodoPage";
import AuthContext from "./store/auth-context";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/todo">
          {authCtx.isLoggedIn && <TodoPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
