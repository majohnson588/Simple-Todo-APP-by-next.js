"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";


import { deleteTodo, editTodo } from "@/api";
import Modal from "./Modal";

/* ✅ 引入 shadcn/ui 组件 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDeleted, setOpenModalDeleted] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.text);

  /* ---- 编辑任务 ---- */
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({ id: task.id, text: taskToEdit });
    setOpenModalEdit(false);
    router.refresh();
  };

  /* ---- 删除任务 ---- */
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>

      <td className="flex gap-5">
        {/* ====== 编辑按钮 ====== */}
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          className="text-blue-500 hover:scale-110 transition-transform cursor-pointer"
          size={25}
        />

        {/* ====== 编辑弹窗 ====== */}
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} title="Edit task">
          <form onSubmit={handleSubmitEditTodo} className="space-y-4">
            <Input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              placeholder="Type your task"
            />

            <div className="flex justify-end gap-3">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Modal>

        {/* ====== 删除按钮 ====== */}
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          className="text-red-500 hover:scale-110 transition-transform cursor-pointer"
          size={25}
        />

        {/* ====== 删除确认弹窗 ====== */}
        <Modal
          modalOpen={openModalDeleted}
          setModalOpen={setOpenModalDeleted}
          title="Delete task"
        >
          <p className="text-sm">Are you sure you want to delete this task?</p>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
              Yes, delete
            </Button>
            <Button variant="outline" onClick={() => setOpenModalDeleted(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
