import { count } from "console";
import { ITask } from "./type/task";

const baseUrl = 'http://localhost:3001';


/* this is to list all records */
export const getAllTodos = async (): Promise<ITask[]> =>{
    const res = await fetch (`${baseUrl}/tasks`,{cache:"no-store"});
    const todos = await res.json();
    return todos;
}


/* this is to create new todo record */
export const addTodo = async (todo: ITask): Promise<ITask> =>{
    const res = await fetch (`${baseUrl}/tasks`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;
}


/* this is to update the todo record */
export const editTodo = async (todo: ITask): Promise<ITask> =>{
    const res = await fetch (`${baseUrl}/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
}


/* this is to remove the todo record */
export const deleteTodo = async (id: any): Promise<void> =>{
    await fetch (`${baseUrl}/tasks/${id}`, {
        method: "DELETE",
    })
}





