"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import Modal from "./Modal";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
    });

    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      {}
      <Button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold w-full sm:w-auto"
      >
        Add new task <AiOutlinePlus size={18} />
      </Button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>

          <div className="w-full flex items-center gap-4 mt-4">
            {}
            <Input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              placeholder="Type your task"
              className="w-full"
            />

            {}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
