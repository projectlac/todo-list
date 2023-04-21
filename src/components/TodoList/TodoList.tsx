import { ITodo } from "@/models/todo";
import { useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { useStore } from "../../contexts/TodoContext";

function TodoList() {
  const { message, setNotification } = useStore();
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<ITodo[]>([]);
  const haveActive: ITodo[] = data.filter((d: ITodo) => d.active === true);

  useEffect(() => {
    if (message.type === "Success") {
      const dataLocal = localStorage.getItem("data");
      if (dataLocal !== null) {
        setData(JSON.parse(dataLocal));
      }
    }
  }, [message]);
  const selectedItem = (id: number) => {
    let tempData: ITodo[] = [...data];
    let index = tempData.findIndex((d: ITodo) => d.id === id);
    tempData[index].active = !tempData[index].active;
    setData(tempData);
  };

  const removeItem = (id: number) => {
    let tempData: ITodo[] = [...data];
    let index = tempData.findIndex((d: ITodo) => d.id === id);
    tempData.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(tempData));
    setNotification({ type: "Success", message: "Remove item successful!" });
  };

  const removeActiveItem = () => {
    let tempData: ITodo[] = [...data];
    let result: ITodo[] = tempData.filter(
      (d: ITodo) => haveActive.indexOf(d) < 0
    );
    localStorage.setItem("data", JSON.stringify(result));
    setNotification({
      type: "Success",
      message: "Remove selected item successful!",
    });
  };

  const filterBySearch: ITodo[] =
    data &&
    data.filter((d: ITodo) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="right-side__wrapper">
      <h2 className="text-center">Todo List</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="todo-list">
        {filterBySearch &&
          filterBySearch.length > 0 &&
          filterBySearch.map((d: ITodo) => (
            <TodoItem
              key={d.id}
              data={d}
              removeItem={removeItem}
              selectedItem={selectedItem}
            />
          ))}
      </div>
      {haveActive.length > 0 && (
        <div className="bulk-action flex justify-between align-center">
          <div className="bulk-action__title">Bulk Action</div>
          <div className="bulk-action__btn flex justify-between">
            <button className="btn done">Done</button>
            <button className="btn remove" onClick={removeActiveItem}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;
