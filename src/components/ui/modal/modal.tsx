import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return createPortal(
    <>
      <div
        style={{
          backgroundColor: "black",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          opacity: 0.5,
        }}
      ></div>
      <div> {children} </div>
    </>,
    document.body
  );
};

export default Modal;
