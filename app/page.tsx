
import Image from "next/image";
import AddTask from "./components/add-task";
import TodoList from "./components/todo-list";
import { getAllTodos } from "@/api";

export default async function Home() {

  const tasks = await getAllTodos();
  console.log("tasks", tasks);
  return (
    <main className="max-w-4xl mx-auto bg-slate-200 mt-4">
      <div className="text-center my-5 flex flex-col gap-4  pr-4 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 pt-6"> Welcome to vTech</h1>
        <AddTask />
      </div>
      <TodoList tasks ={tasks}/>
    </main>
  );
}
