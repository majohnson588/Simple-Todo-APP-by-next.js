"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// Define Zod schema for form validation
const taskFormSchema = z.object({
  text: z
    .string()
    .min(3, "Task must be at least 3 characters long")
    .max(100, "Task must be less than 100 characters")
    .trim()
    .refine((val) => val.length > 0, "Task text is required"),
});

// Infer TypeScript type from Zod schema
type TaskFormData = z.infer<typeof taskFormSchema>;

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      text: ""
    }
  });

  // Handle form submission
  const onSubmit = async (data: TaskFormData) => {
    try {
      await addTodo({
        id: uuidv4(),
        text: data.text,
      });
      
      // Reset form and close modal
      reset();
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to add task:", error);
      // Error notification can be added here
    }
  };

  // Reset form when closing modal
  const handleCloseModal = () => {
    setModalOpen(false);
    reset();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition w-full sm:w-auto"
      >
        Add new task <AiOutlinePlus size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h3 className='font-bold text-lg'>Add new task</h3>
          
          <div className='space-y-2'>
            <input
              {...register("text")}
              type='text'
              placeholder='Type here'
              className={`input input-bordered w-full ${
                errors.text ? 'input-error' : ''
              }`}
            />
            
            {/* Error message */}
            {errors.text && (
              <p className="text-error text-sm">{errors.text.message}</p>
            )}
          </div>

          <div className='modal-action'>
            <button 
              type='submit' 
              className='btn btn-primary'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Submit'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
