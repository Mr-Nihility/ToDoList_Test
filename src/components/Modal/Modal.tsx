import { Dialog } from "@headlessui/react";
import React from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

type CustomModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

function CustomModal({ children, onClose, isOpen }: CustomModalProps) {
  return createPortal(
    <Dialog open={isOpen} onClose={onClose} className="">
      <div className={styles.backDrop} aria-hidden="true">
        <div className={styles.content}>
          <Dialog.Panel className={styles.innerContainer}>
            {children}
          </Dialog.Panel>

          <button onClick={onClose} className={styles.closeBtn}>
            X
          </button>
        </div>
      </div>
    </Dialog>,
    document.body
  );
}

export default CustomModal;
