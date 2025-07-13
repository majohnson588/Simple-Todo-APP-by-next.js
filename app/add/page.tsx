"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";

/* ✅ 引入 shadcn/ui 组件 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

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
    <section className="flex justify-center pt-14">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Add New Task</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Enter task"
              autoFocus
              className="placeholder:text-muted-foreground"
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
