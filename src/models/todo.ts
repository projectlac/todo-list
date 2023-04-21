export interface ITodo {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  piority: string;
  active: boolean;
}
export interface ITodoItemProps {
  data: ITodo;
  removeItem: (id: number) => void;
  selectedItem: (id: number) => void;
}
