import { useStore } from "../../../contexts/TodoContext";
import { IForm } from "@/models/form";
import { ITodo } from "@/models/todo";

import React, { useState } from "react";

function Form({ initForm }: IForm) {
  const { setNotification } = useStore();
  const [defaultForm, setDefaultForm] = useState<ITodo>(
    initForm ?? {
      id: Math.floor(Math.random() * 1000),
      name: "",
      description: "",
      dueDate: "2023-04-21",
      piority: "Normal",
      active: false,
    }
  );

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (initForm === undefined) {
      createTask();
    } else {
      updateTask();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setDefaultForm({ ...defaultForm, [target.name]: target.value });
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setDefaultForm({ ...defaultForm, [target.name]: target.value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    setDefaultForm({ ...defaultForm, [target.name]: target.value });
  };

  const createTask = () => {
    const data = localStorage.getItem("data");
    if (data === null) {
      localStorage.setItem("data", JSON.stringify(Array(defaultForm)));
      setNotification({ type: "Success", message: "Create Successfull!" });
    } else {
      let arrData: ITodo[] = JSON.parse(data);
      let index = arrData.findIndex((d) => d.id === defaultForm.id);
      if (index > -1) {
        setNotification({ type: "Error", message: "Duplicated ID !" });
      } else {
        arrData.push(defaultForm);
        arrData.sort((a: ITodo, b: ITodo) => {
          return a.dueDate.localeCompare(b.dueDate);
        });
        localStorage.setItem("data", JSON.stringify(arrData));
      }
    }
    setDefaultForm({
      id: Math.floor(Math.random() * 1000),
      name: "",
      description: "",
      dueDate: "2023-04-21",
      piority: "Normal",
      active: false,
    });
    setNotification({ type: "Success", message: "Create Successfull!" });
  };

  const updateTask = () => {
    const data = localStorage.getItem("data");
    if (data !== null) {
      let arrData: ITodo[] = JSON.parse(data);
      let index = arrData.findIndex((d) => d.id === defaultForm.id);
      arrData[index] = defaultForm;
      arrData.sort((a: ITodo, b: ITodo) => {
        return a.dueDate.localeCompare(b.dueDate);
      });
      localStorage.setItem("data", JSON.stringify(arrData));
      setNotification({ type: "Success", message: "Update Successfull!" });
    }
  };
  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Add new task ..."
          required
          name="name"
          onChange={handleChange}
          value={defaultForm.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols={30}
          value={defaultForm.description}
          onChange={(e) => handleChangeTextArea(e)}
          rows={10}
        ></textarea>
      </div>

      <div className="form-group">
        <div className="flex justify-between">
          <div>
            <label htmlFor="due-date">Due Date</label>
            <input
              type="date"
              name="dueDate"
              id="due-date"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              value={defaultForm.dueDate}
            />
          </div>
          <div>
            <label htmlFor="piority">Due Date</label>
            <select
              name="piority"
              id="piority"
              value={defaultForm.piority}
              onChange={(e) => {
                handleChangeSelect(e);
              }}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>
      <button className="btn add w-full">
        {initForm !== undefined ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default Form;
