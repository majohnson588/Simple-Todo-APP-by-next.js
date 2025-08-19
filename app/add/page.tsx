"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskPage() {
  const [taskText, setTaskText] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    await addTodo({ id: uuidv4(), text: taskText });
    router.push("/"); // 添加成功后跳转回首页
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task"
          className="input input-bordered w-full"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
