import { useReducer } from "react";
import { Header } from "../components/header/header";
import { Main } from "../components/main/main";
import { Footer } from "../components/footer/footer";
import { todoReducer } from "../reducer";

import "../app/app.css";

export function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <div>
      <Header dispatch={dispatch} />
      <Main todos={todos} dispatch={dispatch} />
      <Footer todos={todos} dispatch={dispatch} />
    </div>
  );
}
