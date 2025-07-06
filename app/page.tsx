import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle"; // ✅ 导入主题切换组件

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-md rounded-xl">

      {/* 标题 + 操作按钮区域（响应式） */}
      <div className="my-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-center sm:text-left">Todo List App</h1>
        <div className="flex gap-2 justify-center sm:justify-end">
          <ThemeToggle />
          <AddTask />
        </div>
      </div>

      {/* 任务列表 */}
      <TodoList tasks={tasks} />
    </main>
  );
}
