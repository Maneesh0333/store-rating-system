import ChangePasswordForm from "../../form/ChangePasswordForm";
import Modal from "./Model";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ChangePasswordModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      <ChangePasswordForm onClose={onClose} />
    </Modal>
  );
}

export default ChangePasswordModal;
