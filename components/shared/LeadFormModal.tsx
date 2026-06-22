"use client";

import Modal from "@/components/ui/Modal";

type LeadFormModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LeadFormModal({ open, onClose }: LeadFormModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Get in touch">
      <p>Lead form placeholder</p>
    </Modal>
  );
}
