import { INotification } from "./notification";

export interface IProvider {
   message:INotification;
   setNotification:(msg:INotification) => void
}