"use client"

import Task from "./tasks";
import { useState } from "react";
import { todo } from "node:test";
import { ITask } from "@/type/task";

interface TodoListProps{

    tasks: ITask[]

}

const TodoList: React.FC<TodoListProps> =({tasks})=>{

    const [searchTerm, setsearchTerm] = useState('');

    return (
      
        <div className="overflow-x-auto border-x-4 p-4 bg-slate-100 grid justify-items-stretch back-g ">
            <input type="text" placeholder="Search by todo ..." value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} 
                className="input input-bordered w-full max-w-xs justify-self-end mb-2" />
   
            <table className="table">
                <thead className="text-blue-900 bg-slate-300">
                    <tr> 
                        <th>Status</th>
                        <th>To Do</th>
                        <th>Created At</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody className="table-body">
                    {tasks.filter((task) => task.todo.toLowerCase().includes(searchTerm)).map((task) => (<Task key={task.id} task={task}/> ))}
                    {tasks.length > 0 &&  tasks.filter((task) => !task.todo.toLowerCase().includes(searchTerm)).length === tasks.length &&
                        <tr>
                            <td  className="text-center text-red-500">“No result. Create a new one instead!”</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    )
}

export default TodoList;