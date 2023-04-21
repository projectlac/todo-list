export interface INotification{
    type: IType,
    message:string
}
export type IType ='Success' | 'Error'
