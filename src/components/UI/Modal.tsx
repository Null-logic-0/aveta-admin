import { Modal } from "antd";

type ModalTypes = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  onOk: () => void;
  loading: boolean;
};

function AppModal({
  isOpen,
  onClose,
  onOk,
  children,
  title,
  loading,
}: ModalTypes) {
  return (
    <Modal
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      onOk={onOk}
      onCancel={onClose}
      loading={loading}
    >
      {children}
    </Modal>
  );
}

export default AppModal;
