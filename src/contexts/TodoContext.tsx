import { INotification } from "@/models/notification";
import { IProvider } from "../models/provider";

import { createContext, ReactNode, useContext, useState } from "react";

export const TodoContext = createContext<IProvider>({} as IProvider);

type Props = {
  children: ReactNode;
};

export function TodoProvider({ children }: Props) {
  const [message, setMessage] = useState<INotification>({
    type: "Success",
    message: "",
  });

  const setNotification = (mgs: INotification) => {
    setMessage(mgs);
    setTimeout(() => {
      setMessage({ type: "Success", message: "" });
    }, 3000);
  };

  return (
    <TodoContext.Provider value={{ message, setNotification }}>
      {children}
    </TodoContext.Provider>
  );
}
export const useStore = () => useContext(TodoContext);
