import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import NavigationLayout from "./components/NavigationLayout/NavigationLayout";
import { RouterPath } from "./types/router.types";
import ErrorPage from "./views/ErrorView/ErrorView";
import HomeView from "./views/Home/HomeView";
import RemovedTodoView from "./views/RemovedTodoView/RemovedTodoView";
import TodoListView from "./views/TodoListView/TodoListView";

function App() {
  return (
    <>
      <Routes>
        <Route path={RouterPath.Home} element={<NavigationLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<h2>Loading ...</h2>}>
                <HomeView />
              </Suspense>
            }
          />
          <Route
            path={RouterPath.TodoList}
            element={
              <Suspense fallback={<h2>Loading ...</h2>}>
                <TodoListView />
              </Suspense>
            }
          />
          <Route
            path={RouterPath.RemovedTodoList}
            element={
              <Suspense fallback={<h2>Loading ...</h2>}>
                <RemovedTodoView />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense fallback={<h2>Loading ...</h2>}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
