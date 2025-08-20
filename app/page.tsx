// page.tsx
import { ITask } from "@/types/tasks";
import { getAllTodos } from "../api"; // page.tsx 在 app/ 下
 // ✅ 添加这一行

import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  let tasks: ITask[] = [];

  try {
    tasks = await getAllTodos();
  } catch (err) {
    console.error("Failed to load tasks on page:", err);
  }

  return (
    <main className="max-w-4xl mx-auto mt-6 p-6 bg-card shadow-md rounded-xl">
      <div className="my-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Todo List App
        </h1>

        <div className="flex gap-2 justify-center sm:justify-end">
          <ThemeToggle />
          <Button asChild>
            <Link href="/add">Add New Task</Link>
          </Button>
        </div>
      </div>

      <TodoList tasks={tasks} />
    </main>
  );
}
