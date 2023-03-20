import { t } from "@/locales";
import { colors } from "@/utils";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => any;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
};

export const Modal = ({ isOpen, onClose, onConfirm, title }: Props) => {
  return (
    <Dialog className={`relative z-50`} open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex h-full flex-col items-center justify-center p-4">
        <Dialog.Panel className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-large">
          <Dialog.Title className="text-header2">{title}</Dialog.Title>

          <div className="flex justify-end gap-4">
            <motion.button
              className="rounded-full border border-gray-300 px-4 py-1"
              whileTap={{ backgroundColor: colors.secondaryTransparent }}
              initial={{ backgroundColor: "#fff" }}
              onClick={onClose}
            >
              {t.common.cancel}
            </motion.button>
            <motion.button
              className="rounded-full bg-primary px-4 py-1 text-white"
              whileTap={{ backgroundColor: colors.secondary }}
              initial={{ backgroundColor: colors.primary }}
              onClick={onConfirm}
            >
              {t.common.confirm}
            </motion.button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
