"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// RHF + Zod
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 表单校验规则：先 trim，再长度限制
const taskFormSchema = z.object({
  text: z
    .string()
    .trim()
    .min(3, "Task must be at least 3 characters")
    .max(100, "Task must be at most 100 characters"),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    mode: "onChange",
    defaultValues: { text: "" },
  });

  const onSubmit = async ({ text }: TaskFormData) => {
    await addTodo({
      id: uuidv4(),
      text: text.trim(),
    });
    reset();
    setModalOpen(false);
    router.refresh();
  };

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition w-full sm:w-auto"
      >
        Add new task <AiOutlinePlus size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h3 className="font-bold text-lg mb-3">Add new task</h3>

          <div className="space-y-2">
            <input
              {...register("text")}
              type="text"
              placeholder="Type here"
              className={`input input-bordered w-full ${errors.text ? "input-error" : ""}`}
              aria-invalid={!!errors.text}
              aria-describedby={errors.text ? "task-text-error" : undefined}
              autoFocus
            />
            {errors.text && (
              <p id="task-text-error" className="text-sm text-red-500">
                {errors.text.message}
              </p>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || !isDirty || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
