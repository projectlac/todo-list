import "./assets/index.css";
import NewTask from "./components/NewTask/NewTask";
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <div className="container">
      <div className="left-side">
        <NewTask />
      </div>
      <div className="right-side">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
