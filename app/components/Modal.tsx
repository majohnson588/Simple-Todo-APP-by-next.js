"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  modalOpen,
  setModalOpen,
  title = "Dialog",
  children,
}) => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

  
        {children}


      </DialogContent>
    </Dialog>
  );
};

export default Modal;
