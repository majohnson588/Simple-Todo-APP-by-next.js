import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch todos: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("getAllTodos error:", err);
    return []; // 出错返回空数组，页面不会崩溃
  }
};

export const addTodo = async (todo: ITask): Promise<ITask | null> => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error(`Failed to add todo: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("addTodo error:", err);
    return null;
  }
};

export const editTodo = async (todo: ITask): Promise<ITask | null> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error(`Failed to edit todo: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("editTodo error:", err);
    return null;
  }
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${baseUrl}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete todo: ${res.status}`);
    return true;
  } catch (err) {
    console.error("deleteTodo error:", err);
    return false;
  }
};
