import { ITodoItemProps } from "@/models/todo";
import { useState } from "react";
import Form from "../Common/Form/Form";

function TodoItem({ data, selectedItem, removeItem }: ITodoItemProps) {
  const [expand, setExpand] = useState<boolean>(false);

  const openExpand = () => {
    setExpand((expand) => !expand);
  };

  return (
    <div className="todo-item">
      <div className="todo-expand-item flex align-center">
        <div className="todo-expand-item__check-box">
          <input
            type="checkbox"
            name=""
            id=""
            checked={data.active}
            onChange={() => {
              selectedItem(data.id);
            }}
          />
        </div>
        <div className="todo-expand-item__name">{data.name}</div>
        <div className="todo-expand-item__btn flex justify-end">
          <button className="btn detail" onClick={openExpand}>
            Detail
          </button>
          <button
            className="btn remove"
            onClick={() => {
              removeItem(data.id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
      {expand && (
        <div className="todo-expand-content">
          <Form initForm={data}></Form>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
